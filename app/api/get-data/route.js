import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    let connection;
    
    try {
        console.log('🔍 Подключение к TimeWeb MySQL для получения данных...');
        
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

        // Получаем данные из таблицы registrations
        let registrations = [];
        try {
            const [regRows] = await connection.execute(
                'SELECT * FROM registrations ORDER BY created_at ASC'
            );
            registrations = regRows;
            console.log(`✅ Успешно получено ${registrations.length} записей из таблицы registrations`);
        } catch (error) {
            console.log('ℹ️ Таблица registrations не найдена или пуста:', error.message);
        }

        // Получаем данные из таблицы visits
        let visits = [];
        try {
            const [visRows] = await connection.execute(
                'SELECT * FROM visits ORDER BY created_at ASC'
            );
            visits = visRows;
            console.log(`✅ Успешно получено ${visits.length} записей из таблицы visits`);
        } catch (error) {
            console.log('ℹ️ Таблица visits не найдена или пуста:', error.message);
        }

        // Формируем данные для Excel
        const excelData = formatDataForExcel(registrations, visits);

        return NextResponse.json(excelData);

    } catch (error) {
        console.error('❌ Ошибка при получении данных из TimeWeb MySQL:');
        console.error('Полная ошибка:', error);
        console.error('Код ошибки:', error.code);
        console.error('Сообщение ошибки:', error.message);
        
        return NextResponse.json(
            { 
                error: 'Ошибка подключения к базе данных',
                details: process.env.NODE_ENV === 'development' ? error.message : 'Внутренняя ошибка сервера',
                data: []
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

// Функция для форматирования данных для Excel
function formatDataForExcel(registrations, visits) {
    // Создаем объект для хранения данных
    const result = {
        registrations: registrations || [],
        visits: visits || [],
        summary: {
            totalRegistrations: (registrations || []).length,
            totalVisits: (visits || []).length,
            museumVisits: (visits || []).filter(v => v.page_type === 'museum').length,
            videoLessonsVisits: (visits || []).filter(v => v.page_type === 'video_lessons').length,
            otherVisits: (visits || []).filter(v => v.page_type && v.page_type !== 'museum' && v.page_type !== 'video_lessons').length
        }
    };

    return result;
}