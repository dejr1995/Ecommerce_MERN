# E-commerce MERN Stack

Una aplicación completa de comercio electrónico construida con el stack MERN (MongoDB, Express.js, React, Node.js) que incluye funcionalidades de tienda online, carrito de compras, procesamiento de pagos con Stripe y panel de administración.

## 🚀 Características

- **Frontend React moderno** con Vite como build tool
- **Gestión de estado** con Redux Toolkit
- **UI Components** con Material-UI y styled-components
- **Procesamiento de pagos** integrado con Stripe
- **Internacionalización** con react-i18next
- **Autenticación JWT** con manejo seguro de tokens

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.2.0** - Framework principal
- **Vite 4.4.0** - Build tool y servidor de desarrollo
- **Redux Toolkit** - Gestión de estado
- **Material-UI 5.14.0** - Biblioteca de componentes
- **React Router 6.14.1** - Enrutamiento
- **Axios** - Cliente HTTP

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **TypeScript types** - Tipado para desarrollo

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Configuración del Frontend

1. Clona el repositorio:
```bash
git clone https://github.com/dejr1995/Ecommerce_MERN.git
cd Ecommerce_MERN/ecommerce
```

2. Instala las dependencias siguiendo los comandos del archivo README 

```bash
npm install
```

3. Configura las variables de entorno:
   - Actualiza la URL del API en `src/store/api.js` 

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🚀 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta el linter de código
- `npm run preview` - Previsualiza la build de producción

## 💳 Configuración de Pagos (Stripe)

El proyecto incluye tarjetas de prueba para testing de Stripe

### Tarjetas de Prueba
- **Fondos insuficientes**: 4000 0000 0000 9995
- **Tarjeta perdida**: 4000 0000 0000 9987
- **Problema con tarjeta**: 4000 0000 0000 0069
- **Sospecha de fraude**: 4000 0000 0000 0119
- **Error de autenticación**: 4000 0000 0000 3063

## 🌐 Configuración de API

La aplicación se conecta al backend a través de configuraciones en `src/store/api.js`. Por defecto usa `localhost:3001/api` para desarrollo local.

## 🔧 Estructura del Proyecto

```
ecommerce/
├── src/
│   ├── store/          # Redux store y slices
│   ├── components/     # Componentes React
│   ├── pages/         # Páginas de la aplicación
│   └── main.jsx       # Punto de entrada
├── public/            # Archivos estáticos
└── package.json       # Dependencias y scripts
```

## 🌍 Internacionalización

La aplicación soporta múltiples idiomas configurados con i18next, con español como idioma predeterminado.

## 📱 Responsive Design

La aplicación incluye estilos responsive para dispositivos móviles y tablets, con breakpoints configurados en los archivos CSS.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso privado según se especifica en el `package.json`.

## Notes

El README se basa en la información disponible del frontend de la aplicación. El proyecto incluye configuraciones avanzadas como internacionalización, procesamiento de pagos con Stripe, y un stack tecnológico moderno con React 18 y Vite. La estructura sugiere que existe también un backend (server_ecommerce) pero no se incluye información detallada del mismo en el contexto proporcionado.
