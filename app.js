require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override');
const axios = require('axios');
const Empleado = require('./models/Empleados');
const Animal = require('./models/Animales');
const Suministro = require('./models/Suministros');
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

// Cargar la configuración del zoo
const zooConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'data', 'zoo.json')));

// Configuración de OpenWeatherMap
const OPENWEATHER_API_KEY = process.env.apikey;
const LAT = zooConfig.lat;
const LON = zooConfig.lon;

// --- RUTAS ---
// Inicio
app.get('/', (req, res) => {
    res.render('index.ejs' , {
        title: 'TaskerZoo - Inicio'
    });
});

// Registro empleado
app.post('/registrarEmpleado', async (req, res) => {
    const { nombre, rol, email, contraseña } = req.body;

    try {

        // Verificar si existe un empleado con el mismo correo
        const empleadoExiste = await Empleado.findOne({ email: email });

        if (empleadoExiste) {
            return res.status(400).json({ message: 'Este correo ya está en uso para este zoológico.' });
        }

        // Crear nuevo empleado
        const nuevoEmpleado = new Empleado({
            nombre,
            rol,
            email,
            contraseña
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

// Ruta para la API del clima
app.get('/api/weather', async (req, res) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json({
            temperatura: data.main.temp,
            descripcion: data.weather[0].description,
            icono: data.weather[0].icon,
            humedad: data.main.humidity,
            viento: data.wind.speed
        });
    } catch (error) {
        console.error('Error en /api/weather:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'No se pudo obtener el tiempo' });
    }
});

// Dashboard
app.get('/dashboard', async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }

    try {
        res.render('dashboard', {
            title: 'TaskerZoo - Dashboard',
            nombreEmpleado: req.session.usuario?.nombre || 'Bienvenido',
            paginaActual: 'dashboard',
            nombreZoo: zooConfig.nombre
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
        const familiasPath = path.join(__dirname, 'public', 'data', 'familiasCientificas.json');
        const data = fs.readFileSync(familiasPath, 'utf-8');
        const familias = JSON.parse(data); // Array de objetos con nombreComun y nombreCientifico

        // Obtener los animales de la base de datos
        const animales = await Animal.find().sort({ createdAt: -1 }); // Ordenados por fecha descendente

        res.render('animales.ejs', { title: 'TaskerZoo - Gestión de Animales', nombreEmpleado: req.session.usuario?.nombre || 'Empleado', paginaActual: 'animales', familias, animales, nombreZoo: zooConfig.nombre });
    } catch (error) {
        console.log('Error al acceder a la gestión de los animales', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Añadir un animal
app.post('/animales', async (req, res) => {
    const { nombre, especie, edad, sexo, zona, familiaCientifica } = req.body;

    try {
        const nuevoAnimal = new Animal({
            nombre,
            especie,
            edad,
            sexo,
            zona,
            familiaCientifica
        });

        await nuevoAnimal.save();
        res.redirect('/animales');
    } catch (error) {
        console.error('Error al crear el animal:', error);
        res.status(500).send('Error al crear el animal');
    }
});

// Salud

// Suministros
app.get('/suministros', async (req, res) => {
    try {
        const suministrosPath = path.join(__dirname, 'public', 'data', 'suministros.json');
        const data = fs.readFileSync(suministrosPath, 'utf-8');
        const categoriasSuministros = JSON.parse(data);

        // Obtener suministros existentes de la base de datos
        const suministros = await Suministro.find().sort({ createdAt: -1 });

        res.render('suministros.ejs', {
            title: 'TaskerZoo - Suministros',
            nombreZoo: zooConfig.nombre ,
            nombreEmpleado: req.session.usuario?.nombre || 'Empleado',
            paginaActual: 'suministros',
            categoriasSuministros,
            suministros
        });
    } catch (error) {
        console.log('Error al acceder a la vista de suministros', error);
        res.status(500).render('error', { mensaje: 'Error al cargar la página de suministros' });
    }
});

// Añadir suministros
app.post('/suministros', async (req, res) => {
    const { nombre, tipo, cantidad } = req.body;

    try {
        const nuevoSuministro = new Suministro({
            nombre,
            tipo,
            cantidad
        });

        await nuevoSuministro.save();
        res.status(201).json({
            success: true,
            data: nuevoSuministro
        });
    } catch (error) {
        console.error('Error al añadir suministro:', error);
        res.status(500).send('Error al añadir suministro');
    }
});
