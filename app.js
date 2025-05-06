require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const Zoo = require('./models/Zoos');
const Empleado = require('./models/Empleados');
const PORT = process.env.PORT || 3000;

// Registrar ejs
app.set('view engine', 'ejs');

// Especificar la carpeta que contiene las vistas
app.set('views', 'vistas');

// Establecer carpeta 'public' para estilos etc...
app.use(express.static(path.join(__dirname, 'public')));

// Para datos JSON
app.use(express.json());
// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
// Para métodos PUT/DELETE
app.use(methodOverride('_method'));
// Middleware para inicio de sesión y cookies
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 semana
  }));

// Conectar con la base de datos
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error en la conexión a la base de datos:', error);
    });

// --- RUTAS ---
// Inicio
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Registro empleado
app.post('/registrarEmpleado', async (req, res) => {
    const { nombre, rol, email, contraseña, idZooName } = req.body;

    try {
        // Buscar el zoo en la base de datos por nombre
        const zoo = await Zoo.findOne({ nombre: idZooName });

        if (!zoo) {
            return res.status(404).json({ error: 'Zoo no encontrado' });
        }

        const zooId = zoo._id; // Obtén el ObjectID del zoo

        // Verificar si existe un empleado con el mismo correo e idZoo
        const empleadoExiste = await Empleado.findOne({ email: email, zooId: zooId });

        if (empleadoExiste) {
            return res.status(400).json({ message: 'Este correo ya está en uso para este zoológico.' });
        }

        // Crear nuevo empleado
        const nuevoEmpleado = new Empleado({
            nombre,
            rol,
            email,
            contraseña,
            zooId
        });

        await nuevoEmpleado.save();

        res.status(201).json({ message: 'Empleado creado correctamente.' });
    } catch (error) {
        console.error('Error registrando empleado:', error);
        res.status(500).json({ message: 'Error registrando empleado.' });
    }
});

// Inicio de sesión
app.post('/loginEmpleado', async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Buscar empleado con ese correo y contraseña
        const empleado = await Empleado.findOne({ email, contraseña });

        if (!empleado) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        req.session.usuario = {
            id: empleado._id,
            nombre: empleado.nombre
        };

        // Si lo encuentra, enviar respuesta exitosa
        res.status(200).json({ message: 'Inicio de sesión exitoso.' });
    } catch (error) {
        console.error('Error en /loginEmpleado:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// --- VISTAS DEL NAV ---

// Dashboard
app.get('/dashboard', async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }

    try {
        res.render('dashboard', {
            nombreEmpleado: req.session.usuario?.nombre || 'Bienvenido',
            paginaActual: 'dashboard'
        });
    } catch (error) {
        console.log('Error al acceder al dashboard', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/verificarSesion', (req, res) => {
    if (req.session.usuario) {
        return res.json({ sesionActiva: true });
    } else {
        return res.json({ sesionActiva: false });
    }
});


// Gestión de animales
app.get('/animales', async (req, res) => {
    try {
        res.render('animales.ejs', { nombreEmpleado: req.session.usuario?.nombre || 'Empleado', paginaActual: 'animales' });
    } catch (error) {
        console.log('Error al acceder a la gestión de los animales', error);
    }
});

// Salud

// Suministros
app.get('/suministros', async (req, res) => {
    try {
        res.render('suministros.ejs', { nombreEmpleado: req.session.usuario?.nombre || 'Empleado', paginaActual: 'suministros' });
    } catch (error) {
        console.log('Error al acceder a la vista de inventario', error);
    }
});

