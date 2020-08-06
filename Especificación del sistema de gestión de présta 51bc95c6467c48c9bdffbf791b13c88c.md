# Especificación del sistema de gestión de préstamos de Almonte.

> Estos documentos describen la especificación del sistema de gestión de préstamos de dinero creado para el Sr. David Almonte.

## El proyecto consistió en construir dos aplicaciones, una que era una aplicación web y otra una aplicación para Android cuyos objetivos eran ayudar a David Almonte y sus asociados a administrar su negocio de préstamos de dinero.

### Objetivos de las aplicaciones.

Si bien las aplicaciones están diseñadas para ayudar a David y sus asociados a administrar su negocio de préstamos de dinero, la aplicación móvil y la aplicación web no tienen los mismos objetivos.

## La aplicación móvil:

### Descripción.

El objetivo principal de la aplicación de Android es ayudar a David a registrar los pagos de los préstamos vencidos cuando salen a cobrar estos pagos. También sirve para agregar los gastos adicionales realizados durante ese día. La aplicación de Android también es capaz de crear nuevos clientes o agregar nuevos préstamos a los clientes, y también recrear un préstamo.

### Funcionalidad.

La aplicación comparte una base de datos y un servidor con la aplicación web, sin embargo, no requiere una conexión a Internet para la mayoría de sus funciones. A continuación hay una lista de cosas que puede hacer sin una conexión a Internet activa.

- Create  new customers,
- Create new loans,
- Register  payments for overdue loans
- Print a receipt for each payment using a Bluetooth printer
- Renew any loan that has been paid up to 51%+
- Register new expenses

Es vital tener en cuenta Para guardar cualquier entrada nueva creada, agregada o modificada sin una conexión a Internet, se debe sincronizar la aplicaciones haciendo clic en el botón Routina al final de cualquier dia que fue usado.

## Cómo utilizar:

Para usar la aplicación primero, el usuario hace clic en un botón Routina  que sincroniza la aplicación con la base de datos en línea. Toda la información nueva creada mientras la aplicación estaba fuera de línea se transmitirá a la base de datos y todos los préstamos vencidos se enviarán a la aplicacion y se clasificarán por ciudad.

## La aplicación web

## Descripción:

Además de todas las funciones de la aplicación móvil, excepto trabajar sin conexión a Internet o imprimir un recibo a través de una impresora Bluetooth, la aplicación web es capaz de lo siguiente.

- Deleting payments,
- Deleting  loan,
- Deleting customer
- Cancel loan,
- Create a new payment plan
- Add a new city,
- Create a new user.
- Also shows a Dashboard

 

Para diferenciar una funcionalidad de otra, tanto la aplicación web como la aplicación de Android se organizan en vistas o páginas con un menú lateral que se puede alternar para facilitar el acceso a estas funcionalidades.

[Paginas de la aplicacion web.](https://www.notion.so/8f4cbdaba737427e9e0ac5478af7b34b)

[Vista de la App Android](https://www.notion.so/261582d07a4f457fa972a3f1a2ea03b1)

Al firmar este documento, usted acepta que todas estas características mencionadas anteriormente han sido probadas e implementadas y este documento describe la functionalidad completa de la applicacion.

[Firmas](https://www.notion.so/155c54f0c29b4bcd93a31a24bbb6e2b2)