# 🐾 TaskerZoo

## Gestión Interna para Zoológicos

**TaskerZoo** es una plataforma web diseñada para facilitar la gestión interna de zoológicos. Permite controlar animales, incidencias, personal, zonas, suministros, eventos y la salud animal.  

---

## 📝 Descripción

TaskerZoo proporciona una interfaz moderna, accesible y eficiente para los trabajadores del zoológico. Ofrece funcionalidades clave para la gestión diaria, como el seguimiento del estado de los animales, reportes de incidencias, control de suministros y más. El sistema incluye:

## 🌍 Landing Page (Animundo)

Información general del zoológico como su ubicación, imágenes de los animales, un formulario para la compra de entradas y los horarios.

## 🔐 Área de Gestión Interna (TaskerZoo)

Dashboard con visión general del estado del zoológico actual: datos meteorológicos, aforo, incidencias y eventos del día.

Gestión de animales: Registro, historial médico y zona en la que se ubican.

Salud animal: Registros de salud personalizados.

Suministros: Inventario con el que cuenta el zoo.

Zonas: Controlar el estado(abierta o cerrada temporalmente) y el número de zonas que tiene habilitadas el zoo.

Personal: Visualización de la plantilla actual del zoo dividida por roles.

Eventos: Programación de actividades especiales, zona y fecha en la que se llevarán a cabo.

Incidencias: Reporte y seguimiento de problemas.

Ajustes: Cambio de contraseña de la cuenta del empleado y posibilidad de eliminarla.
 
---

## 🚀 Tecnologías utilizadas

| Categoría               | Herramienta / Descripción                                                                                   |
|-------------------------|------------------------------------------------------------------------------------------------------------|
| **Lenguaje de marcado** | HTML5: Estructura de las páginas.                                                                          |
| **Lenguaje de estilos** | CSS3: Estilos visuales personalizados + **Tailwind CSS** para diseño responsivo.                          |
| **Lenguaje de programación** | JavaScript: En frontend (DOM y lógica) y backend (Node.js).                                           |
| **Motor de plantillas** | EJS: Generación dinámica de vistas HTML.                                                                   |
| **Framework backend**   | Express: Framework para servidor y rutas en Node.js.                                                       |
| **Librerías JS**        | Flatpickr (selector de fechas), Leaflet (mapas interactivos).                                              |
| **Base de datos**       | MongoDB: Base de datos NoSQL para entidades del zoológico.                                                 |
| **Datos externos**      | OpenWeatherMap API: Datos del clima en tiempo real.                                                        |
| **Contenedores**        | Docker: Para empaquetar y desplegar la aplicación.                                                         |
| **Hosting**             | Render: Despliegue de servidor y base de datos.                                                            |
| **Control de versiones**| Git & GitHub: Gestión de código y colaboración.                                                            |
| **Editor de código**    | Visual Studio Code: Editor principal utilizado.                                                            |

---

## 📁 Estructura del proyecto

```

TaskerZoo/
│
├── models/
│   ├── Aforo.js
│   ├── Animales.js
│   ├── Empleados.js
│   ├── Eventos.js
│   ├── Incidencias.js
│   ├── RegistrosSalud.js
│   ├── Suministros.js
│   └── Zonas.js
│
├── public/
│   ├── css/
│   │   ├── estiloTaskerZoo.css
│   │   └── estiloTaskerZooOutput.css
│   │
│   ├── data/
│   │   ├── backgrounds.json
│   │   ├── familiasCientificas.json
│   │   ├── suministros.json
│   │   ├── zonas.json
│   │   └── zoo.json
│   │
│   ├── favicons/
│   ├── img/
│   └── js/
│       ├── codigoAnimales.js
│       ├── codigoEventos.js
│       ├── codigoIncidencias.js
│       ├── codigoSalud.js
│       ├── codigoSuministros.js
│       ├── codigoTaskerzoo.js
│       └── codigoZonas.js
│
├── vistas/            
│   ├── partials/
│   │   ├── header.ejs
│   │   └── nav.ejs
│   │
│   ├── 404.ejs        
│   ├── ajustes.ejs
│   ├── animales.ejs   
│   ├── dashboard.ejs  
│   ├── eventos.ejs
│   ├── incidencias.ejs
│   ├── index.ejs      
│   ├── personal.ejs   
│   ├── saludAnimales.ejs
│   ├── suministros.ejs
│   ├── taskerzoo.ejs
│   └── zonas.ejs
│
├── .gitignore
├── Dockerfile
├── app.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
└── tailwind.config.js

```

## ⚙️ Instalación y ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Barbara-psm/TaskerZoo.git


2. Accede a la carpeta del proyecto:

    ```bash
    cd taskerzoo

3. Instala las dependencias:

    ```bash
    npm install

4. Configura las variables de entorno en un archivo .env tal que así:

    ```bash
    PORT='tuPuerto'
    MONGO_URI='mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombreBD?retryWrites=true&w=majority'
    SECRET_SESSION='tuClaveSecreta'
    apikey='tuApiKeyOpenWeather'

5. Ejecuta la aplicación:

    ```bash
    node app.js

6. Abre un navegador y accede desde:

    http://localhost:3000

---

### 🔗 URL del proyecto

[https://animundo-taskerzoo.onrender.com](https://animundo-taskerzoo.onrender.com)

---

### 👩‍🎓 Autoría

**Bárbara Pérez-Santamarina Maestre**  
Proyecto Final de Grado – *Desarrollo de Aplicaciones Web (DAW)*

