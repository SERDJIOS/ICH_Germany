const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    try {
        res.setHeader('Content-Type', 'text/plain');

    
        if (req.method === 'PUT') {
            res.statusCode = 200;
            return res.end('PUT-запрос обработан');
        }

        if (req.method === 'DELETE') {
            res.statusCode = 200;
            return res.end('DELETE-запрос обработан');
        }


        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            res.statusCode = 401;
            return res.end('Unauthorized');
        }

        res.statusCode = 200;
        res.end('Authorization header received');

    } catch (err) {
        
        const logEntry = `${new Date().toISOString()} - ${err.stack}\n`;
        fs.appendFile('errors.log', logEntry, (error) => {
            if (error) console.error('Ошибка записи в лог:', error);
        });

        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
});

server.listen(3000, () => {
    console.log('🚀 Сервер запущен на http://localhost:3000');
});
