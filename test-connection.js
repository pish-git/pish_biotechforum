// test-timeweb-connection.js
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function testTimeWebConnection() {
  let connection;
  
  try {
    const sslCertPath = path.join(__dirname, 'certs', 'root.crt');
    
    if (!fs.existsSync(sslCertPath)) {
      console.error('❌ SSL сертификат не найден');
      return;
    }

    const connectionConfig = {
      host: '1a15a6fa72795aef623e5e66.twc1.net', // ваш домен TimeWeb
      port: 3306,
      user: 'gen_user',
      password: '1Sz>E*,1<@A=Km',
      database: 'default_db',
      ssl: {
        ca: fs.readFileSync(sslCertPath),
        rejectUnauthorized: true
      }
    };

    console.log('🔄 Подключение к TimeWeb MySQL...');
    connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Успешное SSL подключение к TimeWeb MySQL!');

    // Тестовый запрос
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Тестовый запрос выполнен:', rows);

  } catch (error) {
    console.error('❌ Ошибка подключения:', error.message);
    console.error('Код ошибки:', error.code);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Соединение закрыто');
    }
  }
}

testTimeWebConnection();