const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const db = require('./database');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la sesión
app.use(session({
    secret: 'tu_secreto_aqui',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

// Configuración del correo electrónico
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña'
    }
});

// Middleware para manejar carpetas estáticas
app.use(express.static('public'));

// Página de inicio
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Página de login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Manejo del login
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.get("SELECT password FROM users WHERE username = ?", [username], (err, row) => {
        if (err) {
            console.error(err.message);
            res.send('Error en la base de datos.');
        } else if (row && bcrypt.compareSync(password, row.password)) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/dashboard');
        } else {
            res.send('Usuario o contraseña incorrectos.');
        }
    });
});

// Página del dashboard (después del login)
app.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
        res.send(`<h1>Bienvenido ${req.session.username}</h1><p>Esta es tu área privada.</p>`);
    } else {
        res.send('Por favor, inicia sesión primero.');
    }
});

// Manejo de la suscripción al blog y envío de correo de confirmación
app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    db.run("INSERT INTO subscribers (email) VALUES (?)", [email], (err) => {
        if (err) {
            console.error(err.message);
            res.send('Hubo un problema al agregar tu suscripción.');
        } else {
            const mailOptions = {
                from: 'tu_correo@gmail.com',
                to: email,
                subject: 'Gracias por suscribirte a nuestro blog',
                text: '¡Gracias por suscribirte! Recibirás nuestras actualizaciones directamente en tu correo.'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.send('Hubo un problema al enviar el correo.');
                } else {
                    console.log('Correo enviado: ' + info.response);
                    res.send('¡Gracias por suscribirte! Revisa tu correo para confirmar.');
                }
            });
        }
    });
});

// Servidor corriendo en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
