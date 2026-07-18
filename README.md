# NesTec React

Proyecto final de ecommerce hecho con React y Vite.

## Lo que incluye

- Carrito con Context API
- Login, registro y rutas protegidas
- CRUD de productos
- Carga y manejo de errores
- Cupones de descuento en el carrito
- Diseno responsive

## Requisitos

- Node.js 18 o superior
- npm

## Instalacion

1. Instalar dependencias:

```bash
npm install
```

2. Copiar `.env.example` a `.env` y completar los datos de Firebase si se quiere usar Authentication y Firestore reales.

3. Levantar el proyecto:

```bash
npm run dev
```

## Firebase

Si el archivo `.env` tiene configuradas las variables de Firebase:

- el login y registro usan Firebase Authentication
- el panel de gestion usa Firebase Firestore en la coleccion `productos`

Si no hay configuracion de Firebase, la app igual funciona en modo local:

- los usuarios se guardan en `localStorage`
- los productos del CRUD tambien se guardan en `localStorage`

Esto se hizo para que el proyecto pueda probarse rapido sin bloquear el funcionamiento.

## Rutas principales

- `/` inicio
- `/productos` listado de productos
- `/producto/:id` detalle de producto
- `/carrito` carrito
- `/login` login
- `/registro` registro
- `/perfil` perfil privado
- `/panel` panel privado con CRUD

## Cupones

En el carrito hay dos cupones de ejemplo:

- `NES10`
- `NES20`