📍 MallMap

MallMap es una aplicación mobile desarrollada con React Native + Expo que permite a los usuarios explorar locales dentro de un shopping, ver su ubicación, marcarlos como favoritos y acceder a funcionalidades offline.

El objetivo principal de la app es facilitar la búsqueda de locales dentro de un shopping, evitando la confusión habitual sobre pisos, zonas o si un local existe o no.


🚀 Funcionalidades principales:

🔐 Autenticación de usuarios con Firebase Authentication

🏬 Listado de locales por shopping

🔎 Búsqueda de locales por nombre

❤️ Sistema de favoritos:

- Persistencia local (SQLite)

- Sincronización con Firebase Realtime Database

📍 Ubicación del shopping:

- Acceso a Google Maps desde la app

📴 Modo offline:

- Los datos de locales se guardan localmente

- La app funciona sin conexión

🧭 Detalle de local:

- Categoría

- Piso

- Zona

- Imagen representativa


La idea surge a partir de una problemática real:

“Cuando uno visita un shopping, suele ser difícil encontrar rápidamente en qué piso o zona se encuentra un local.”

MallMap busca resolver esto ofreciendo una interfaz clara, simple y optimizada para dispositivos móviles.



🛠️ Tecnologías utilizadas

- React Native

- Expo

- Expo Router

- Redux Toolkit

- Firebase

- Authentication

- Realtime Database

- SQLite (expo-sqlite)

- TypeScript



🗂️ Estructura del proyecto

/app
├── (auth) → Pantallas de autenticación
├── (tabs) → Navegación principal
├── store/[id].tsx → Detalle de local
/api
└── firebase → Configuración y servicios Firebase
/database
└── sqlite.ts → Persistencia local (offline)
/store
├── slices → Redux slices
└── index.ts → Store principal
/components
├── common → Componentes reutilizables
└── stores → Componentes de locales



📍 Permisos del dispositivo

La app utiliza:
Ubicación (Location)

- Para abrir Google Maps con la ubicación del shopping


📦 Persistencia de datos
🔸 Firebase Realtime Database

- Locales del shopping

- Favoritos por usuario


👤 Autor

Proyecto desarrollado por Tomás Pitt
Curso Desarrollo de Aplicaciones – CoderHouse
