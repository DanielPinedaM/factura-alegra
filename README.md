# ***Nota:***
**Por favor no me descalifiquen 😢 por no usar un manejador de estado global ([useContext](https://react.dev/reference/react/useContext), [Redux Toolkit](https://redux-toolkit.js.org/), [Zustand](https://youtu.be/pAHPHivDbuE?si=JtlQWrvOlv_GSmAx), etc). Me esforcé mucho haciendo esto porque tengo muchas ganas de ser parte de su equipo de devs 😀🤖. Muchas gracias por leerme 😉👍**

![estado_global](/readme_img/estado_global.PNG)

# Reto Técnico Frontend de [Alegra](https://www.alegra.com/)

### 1. Aviso: ⚠️
Solamente se pueden buscar 200 imagenes por hora, si se buscan más, la [API de Pexels](https://www.pexels.com/api/documentation/?language=javascript#guidelines) no muestra imagénes y esto no permitiría [crear la factura en Alegra](https://developer.alegra.com/reference/get_invoices). Por favor no exceda el límite de búsquedas:

![aviso](/readme_img/aviso.PNG)

---

### 2. Link de Deploy en GitHub Pages

[https://danielpinedam.github.io/factura-alegra/](https://danielpinedam.github.io/factura-alegra/)

---

### 3. Link Repositorio GitHub

[https://github.com/DanielPinedaM/factura-alegra](https://github.com/DanielPinedaM/factura-alegra)

---

### 4. Credenciales
* Alegra:
  * **usuario** pineda.daniel700@gmail.com
  * **token** 5d5fffcc905068083383
  * **Authorization** Basic pineda.daniel700@gmail.com:5d5fffcc905068083383
  * **Authorization en base_64** Basic cGluZWRhLmRhbmllbDcwMEBnbWFpbC5jb206NWQ1ZmZmY2M5MDUwNjgwODMzODM=

![key_alegra](/readme_img/key_alegra.PNG)

* Pexels, API para buscar imágenes:
  * **token** 4uJ1U1a0Ten7J8OnpWSGdhp9y48pLK6cRmaxVZzFfHNkNc5e0fRfFRBb
  * **endpoint** [https://api.pexels.com/v1/search?query=](https://api.pexels.com/v1/search?query=)

***Variables de entorno:*** 

![env](/readme_img/env.PNG)

[https://github.com/DanielPinedaM/factura-alegra/blob/main/.env](https://github.com/DanielPinedaM/factura-alegra/blob/main/.env)

```javascript
VITE_API_KEY_ALEGRA=Basic cGluZWRhLmRhbmllbDcwMEBnbWFpbC5jb206NWQ1ZmZmY2M5MDUwNjgwODMzODM=
VITE_ENDPOINT_SELLER_ALEGRA=https://api.alegra.com/api/v1/sellers
VITE_ENDPOINT_INVOICES_ALEGRA=https://api.alegra.com/api/v1/invoices
VITE_ENDPOINT_CONTACTS_ALEGRA=https://api.alegra.com/api/v1/contacts 
VITE_ENDPOINT_PRODUCT_ALEGRA=https://api.alegra.com/api/v1/items

VITE_API_KEY_PEXELS=4uJ1U1a0Ten7J8OnpWSGdhp9y48pLK6cRmaxVZzFfHNkNc5e0fRfFRBb
VITE_ENDPOINT_PEXELS=https://api.pexels.com/v1/search?query=
```

---

### 5. Endpoint de Alegra:
  * **Vendedor (seller):**
    https://developer.alegra.com/reference/createseller

  * **Cliente (contacts):**
    https://developer.alegra.com/reference/post_contacts

  * **Producto (items):**
    https://developer.alegra.com/reference/get_items

  * **Factura (invoices):**
    https://developer.alegra.com/reference/get_invoices

---

### 6. Modelo Entidad Relación de Factura
Necesario para hacer las relaciones cuando se hacen las peticiones al endpoint de Alegra.

Todas las relaciones se hacen automáticamente desde el frontend.

* Llaves:
  * **PK:** Primary Key
  * **FK:** Foreign Key

* Relación:
  * **uno:** ![uno](/readme_img/uno.PNG)
  * **muchos:** ![muchos](/readme_img/muchos.PNG)

![modelado](/readme_img/modelado.PNG)

---

### 7. Estructura del Proyecto

* Componentes:

![componentes](/readme_img/componentes.PNG)

* Archivos y carpetas:

![carpetas](/readme_img/carpetas.png)

---

### 8. Demostración funcionamiento proyecto

* **Nota:** 🎨 El video lo hice antes de la maquetación Responsive por eso la interfaz se ve "fea", pero en GitHub y producción la interfaz se ve mucho mejor (ver punto ***11***).

* **Video privado en YouTube:** [https://youtu.be/f_Shm7WdsSw](https://youtu.be/f_Shm7WdsSw)

---

### 9. Tecnologías en que hice el proyecto
  * [Git](https://www.udemy.com/course/git-github/)
  * [GitHub](https://github.com/DanielPinedaM/)
  * [GitHub Pages](https://www.youtube.com/watch?v=UX4gvort2TU&feature=youtu.be)
  * [ESLint](https://youtu.be/QpDpRmlFfqI)
  * [HTML 5](https://www.youtube.com/watch?v=-oK6zL01fNM&feature=youtu.be)
  * [CSS 3](https://www.youtube.com/watch?v=udGrXWeJp1Y&feature=youtu.be)
  * [Tailwind](https://www.youtube.com/watch?v=h5HQVHTpeHs&feature=youtu.be)
  * [TypeScript](https://www.udemy.com/course/typescript-guia-completa/)
  * [Vite](https://www.youtube.com/watch?v=UX4gvort2TU&feature=youtu.be)
  * [React + Custom Hooks](https://www.udemy.com/course/react-cero-experto/)

---

### 10. Guía de Instalación
* **1.** Instalar [NodeJS](https://nodejs.org/es):

![nodejs](/readme_img/nodejs.PNG)

* **2.** Descargar (clonar) el repositorio:

![clonar](/readme_img/clonar.png)

* **3.** Abrir VS Code o su terminal en la ruta donde se descargo el proyecto

![terminal](/readme_img/terminal.png)

* **4.** Verificar que en el proyecto este el archivo .env

![env_2](/readme_img/env_2.PNG)

* **5.** Ejecutar en la terminal el siguiente comando que instala los paquetes necesarios para ejecutar la aplicación:

```javascript
npm i
```

![npm_i](/readme_img/npm_i.PNG)

* **6.** Verificar que se cree la carpeta node_modules en la carpeta raiz del proyecto

![node_modules](/readme_img/node_modules.PNG)

* **7.** Ejecutar en la terminal el siguiente comando que inicializa la aplicación:

```javascript
npm run dev
```

![npm_run_dev](/readme_img/npm_run_dev.PNG)

* **8.** La terminal muestra el puerto local donde se esta ejecutando la aplicación, en este caso es:

```javascript
http://localhost:5173/
```

![localhost](/readme_img/localhost.PNG)

* **9.** Abrir en el navegador [http://localhost:5173/](http://localhost:5173/)

![navegador](/readme_img/navegador.PNG)

* **10.** No cerrar la terminal donde ejecuto los comandos para que se pueda seguir ejecutando la aplicación.

---

### 11. Maquetación Responsive (Interfaz Gráfica)

![1](/readme_img/responsive/1.PNG)

![2](/readme_img/responsive/2.PNG)

![3](/readme_img/responsive/3.PNG)

![4](/readme_img/responsive/4.PNG)

![5](/readme_img/responsive/5.PNG)

![6](/readme_img/responsive/6.PNG)

![7](/readme_img/responsive/7.PNG)

![8](/readme_img/responsive/8.PNG)

![9](/readme_img/responsive/9.PNG)

![10](/readme_img/responsive/10.PNG)

![11](/readme_img/responsive/11.PNG)

![12](/readme_img/responsive/12.PNG)

![13](/readme_img/responsive/13.PNG)

---

### 12. Colaborador en Repositorio Privado

![colaborador](/readme_img/colaborador.PNG)
