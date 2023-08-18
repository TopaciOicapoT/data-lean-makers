# data-lean-makers

# Contenido

1. front-dlm-dni
2. back-dlm-dni
# Herramientas y Tecnologías
- Node.Js
- express
- cors
- dotenv
- pg
- zod
- HTML5
- tailwind
- tailwindcss animated
- javaScript(ES++)
- Lit.js
- vite
    
## Descripción y uso

Este proyecto genera formularios a partir de un formulario principal, tendremos que introducir un nombre para el nuevo formulario, una descripción y elegir los inputs que mostrara con sus respectivos nombres y tipos, una vez generado, nuestro formulario aparecerá debajo del formulario principal.

Los formularios se guardaran en una base de datos SQL, la tabla necesaria para ello se crea automáticamente para este proyecto, en caso de que la tabla ya este creada no se duplicara, en esta tabla almacenaremos los datos de los formularios que luego aparecerán en una lista a la que le pasaremos los datos. 

En la lista de formularios creados podremos interactuar con ellos y actualizar su nombre y descripción, si el formulario ya no es util solo tenemos que pulsar el botón de eliminar.


## Instalación

1. Clona este repositorio: `git clone https://github.com/TopaciOicapoT/data-lean-makers.git`
2. Ingresa al directorio del proyecto: `cd front-dlm-dni`
3. Ingresa al directorio del proyecto: `cd back-dlm-dni`
3. Instala las dependencias: `npm install`
