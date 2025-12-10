import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    let connection;
    
    try {
        console.log('🔍 Подключение к TimeWeb MySQL...');
        console.log('📊 Проверка переменных окружения:');
        console.log('DB_HOST:', process.env.DB_HOST);
        console.log('DB_USER:', process.env.DB_USER);
        console.log('DB_NAME:', process.env.DB_NAME);
        console.log('DB_PORT:', process.env.DB_PORT);

        // Получаем данные из тела запроса
        const body = await request.json();
        const { fio, email, region, type, pageType } = body;

        console.log('📥 Получены данные:', body);

        // Подключаемся к MySQL
        const mysql = await import('mysql2/promise');
        
        console.log('🔄 Попытка SSL подключения к TimeWeb MySQL...');
        
        // Путь к SSL сертификату
        const sslCertPath = path.join(process.cwd(), 'certs', 'root.crt');
        
        console.log('📁 Путь к сертификату:', sslCertPath);
        console.log('✅ Сертификат существует:', fs.existsSync(sslCertPath));

        // Настройки подключения для TimeWeb Cloud
        const connectionConfig = {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectTimeout: 15000,
            acquireTimeout: 15000,
            timeout: 15000,
            // SSL настройки для TimeWeb
            ssl: {
                ca: fs.readFileSync(sslCertPath),
                rejectUnauthorized: true
            }
        };

        console.log('🔐 Конфигурация подключения:');
        console.log('- Хост:', connectionConfig.host);
        console.log('- Порт:', connectionConfig.port);
        console.log('- Пользователь:', connectionConfig.user);
        console.log('- База данных:', connectionConfig.database);

        console.log('🔐 Настройки SSL подключения готовы');
        
        // Пробуем подключиться
        connection = await mysql.createConnection(connectionConfig);
        
        console.log('✅ SSL подключение к TimeWeb MySQL установлено');

        // Обработка разных типов запросов
        if (type === 'visit') {
            // Запрос от кнопки "Посетить"
            console.log('🎯 Обработка данных о посещении для страницы:', pageType);
            
            if (!pageType) {
                return NextResponse.json(
                    { message: 'Тип страницы обязателен для данных о посещении' },
                    { status: 400 }
                );
            }

            // Создаем таблицу для посещений если её нет
            await createVisitsTableIfNotExists(connection);

            // Вставляем данные о посещении
            const [result] = await connection.execute(
                'INSERT INTO visits (page_type) VALUES (?)',
                [pageType]
            );

            console.log('✅ Данные о посещении сохранены, ID:', result.insertId);

            return NextResponse.json(
                { 
                    message: 'Данные о посещении успешно сохранены!',
                    id: result.insertId 
                },
                { status: 201 }
            );

        } else {
            // Старый запрос от формы регистрации
            console.log('📝 Обработка данных формы регистрации');

            // Валидация данных для формы регистрации
            if (!fio || !email || !region) {
                return NextResponse.json(
                    { message: 'Все поля обязательны для заполнения' },
                    { status: 400 }
                );
            }

            // Создаем таблицу для регистраций если её нет
            await createRegistrationsTableIfNotExists(connection);

            // Вставляем данные в таблицу регистраций
            const [result] = await connection.execute(
                'INSERT INTO registrations (fio, email, region) VALUES (?, ?, ?)',
                [fio, email, region]
            );

            console.log('✅ Данные регистрации успешно сохранены, ID:', result.insertId);

            return NextResponse.json(
                { 
                    message: 'Данные успешно сохранены в базу данных!',
                    id: result.insertId 
                },
                { status: 201 }
            );
        }

    } catch (error) {
        console.error('❌ Ошибка при сохранении в TimeWeb MySQL:');
        console.error('Полная ошибка:', error);
        console.error('Код ошибки:', error.code);
        console.error('Сообщение ошибки:', error.message);
        console.error('Стек вызовов:', error.stack);
        
        return NextResponse.json(
            { 
                message: 'Ошибка подключения к базе данных',
                details: process.env.NODE_ENV === 'development' ? `ECONNREFUSED - проверьте хост и порт. Хост: ${process.env.DB_HOST}, Порт: ${process.env.DB_PORT}` : 'Внутренняя ошибка сервера'
            },
            { status: 500 }
        );

    } finally {
        // Закрываем соединение
        if (connection) {
            try {
                await connection.end();
                console.log('🔌 Соединение с MySQL закрыто');
            } catch (closeError) {
                console.error('Ошибка при закрытии соединения:', closeError);
            }
        }
    }
}

// Функция для создания таблицы регистраций если её нет
async function createRegistrationsTableIfNotExists(connection) {
    try {
        const [tables] = await connection.execute(
            `SELECT TABLE_NAME 
            FROM information_schema.TABLES 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
            [process.env.DB_NAME, 'registrations']
        );

        if (tables.length === 0) {
            console.log('🆕 Таблица "registrations" не найдена, создаем...');
            
            await connection.execute(`
                CREATE TABLE registrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fio VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                region VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            console.log('✅ Таблица "registrations" успешно создана');
        } else {
            console.log('✅ Таблица "registrations" уже существует');
        }

    } catch (error) {
        console.error('❌ Ошибка при создании таблицы registrations:', error);
        throw error;
    }
}

// Функция для создания таблицы посещений если её нет
async function createVisitsTableIfNotExists(connection) {
    try {
        const [tables] = await connection.execute(
            `SELECT TABLE_NAME 
            FROM information_schema.TABLES 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
            [process.env.DB_NAME, 'visits']
        );

        if (tables.length === 0) {
            console.log('🆕 Таблица "visits" не найдена, создаем...');
            
            await connection.execute(`
                CREATE TABLE visits (
                id INT AUTO_INCREMENT PRIMARY KEY,
                page_type VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            console.log('✅ Таблица "visits" успешно создана');
        } else {
            console.log('✅ Таблица "visits" уже существует');
        }

    } catch (error) {
        console.error('❌ Ошибка при создании таблицы visits:', error);
        throw error;
    }
}