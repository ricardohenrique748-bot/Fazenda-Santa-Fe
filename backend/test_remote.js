import http from 'http';
import https from 'https';

const req = https.post('https://agro-sys-api.onrender.com/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => console.log('Response:', res.statusCode, data));
});

req.on('error', console.error);
req.write(JSON.stringify({ email: 'ricardo.luz@eunaman.com.br', senha: '85245655' }));
req.end();
