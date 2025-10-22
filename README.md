# Sprint-2.2
---

## Descripción:
Este es un pequeño proyecto de carrito de compras hecho con JavaScript. El carrito permite agregar productos, aplicar promociones de descuento y gestionar la compra de manera dinámica.

## Funcionalidades:
- Agregar productos al carrito o incrementar su cantidad si ya está presente.
- Eliminar productos del carrito de manera individual (borrar items individualmente) o colectiva (borrar todo el carrito)
- Aplicar descuentos si un producto tiene una oferta asociada y en tal caso el carrito aplicará el descuento correspondiente basado en la cantidad de productos que se han añadido.
- Ver el total del carrito, el precio total se calcula y se muestra dinámicamente, considerando descuentos si los hay.
- Limpiar carrito (aspecto visual) Pudiendo vaciar el carrito con un solo clic.
- Contador de productos en el navbar: El número total de productos en el carrito se actualiza en tiempo real en el navbar, además el botón de "limpiar carrito" se habilita o deshabilita según el estado del carrito.

## Técnologias Utilizadas:
- HTML
- CSS Bootstrap
- JS

## Instalación:

- Abre la terminal Git Bash
- Busca una carpeta en la que se desee depositar el proyecto
- Clona el repositorio utilizando el siguiente codigo
```bash
git clone https://github.com/JordiMiravet/Bootcamp-S2.2.git
```
- Abre el proyecto en el IDE
- Instala la extension `Live Server` y abre con ella el archivo index.html en tu navegador.

---

## Javascript

### Estructura del código:

#### products.js
- Aquí se encuentra un arreglo con todos los productos disponibles para agregar al carrito. Cada producto tiene información como el id, nombre, precio y algunos productos tienen una oferta con un número de unidades necesarias para el descuento y el porcentaje de descuento.

#### validate.js
- Este script contiene las funciones necesarias para validar los campos del formulario en la página checkout.html. Se encarga de comprobar que los datos introducidos por el usuario cumplen con ciertos requisitos (como longitud mínima, formato de email, uso de solo letras o números, etc.).
- Además, aplica de forma dinámica los estilos visuales de Bootstrap (`is-valid` / `is-invalid`) en los campos del formulario, indicando si el contenido introducido es valido o no.

### Funciones principales:

#### Funcion `buy(id)`
- Añade un producto al carrito. Si el producto ya está en el carrito, aumenta su cantidad. Si no, lo agrega con una cantidad inicial de 1.

#### Funcion `cleanCart()`
- Limpia todo el carrito.

#### Funcion `calculateTotal()`
- Calcula el precio total de todos los productos en el carrito, considerando la cantidad de cada producto.

#### Funcion `applyPromotionsCart()`
- Aplica los descuentos a los productos que tengan una oferta, basado en la cantidad.

#### Funcion `printCart()`
- Muestra el contenido del carrito en el HTML, actualizando la lista y el total.

#### Funcion `removeFromCart(id)`
- Elimina un producto del carrito (o en su defecto reduce su cantidad en 1).

#### Funcion `addFromCart(id)`
- Aumenta la cantidad de un producto en el carrito en 1.

#### Funcion `countProduct()`
- Actualiza el contador de productos en el navbar y habilita/deshabilita el botón de "limpiar carrito" segun la cantidad de producto que hay en el.

#### Función `validateInput(input, isValid)`
- Aplica clases de Bootstrap para mostrar visualmente si un campo del formulario es válido o no. Añade la clase `is-valid` si el valor es correcto o `is-invalid` si no lo es.

#### Función `getInputsForm()`
- Devuelve una colección de referencias a los campos del formulario (nombre, apellido, email, contraseña, dirección, teléfono) para usarlos en las funciones de validación.

#### Función `getRegex()`
- Devuelve los patrones de expresiones regulares utilizados para validar el contenido de los inputs: texto, números, contraseña y formato de email.

#### Función `validate()`
- Ejecuta la validación de todos los campos del formulario utilizando las expresiones regulares y condiciones mínimas (como longitud de texto). Aplica los estilos correspondientes (`is-valid` / `is-invalid`) a cada input, según si pasa la validación o no.

### Eventos
- En la pagina index.html, los botones de agregar al carrito, eliminar productos, y aumentar la cantidad del carrito tienen eventos asociados que gestionan las funciones correspondientes. Además, se actualizan dinámicamente tanto el carrito como el total cuando se realizan acciones.
- El formulario de `checkout.html` tiene un evento asociado al envío (`submit`). Este evento es interceptado para evitar el comportamiento por defecto (recargar la página), y en su lugar ejecuta la función validate() para comprobar los datos introducidos.

## HTML & CSS

### Estructura de la página: 
- El HTML tiene una sección para mostrar los productos, un área para el carrito y un navbar donde se muestra el contador de productos dinamicamente, además de una pagina dedicada para la validacion de datos.

---

## Autor:
- Proyecto creado por Jordi Miravet &copy; como parte del mòdulo S.2.2 del Bootcamp de Frontend de itAcademy