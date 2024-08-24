![UDD logo](https://github.com/EdduOlv/Proyecto-_Modulo1/assets/156525513/2c9572c9-af59-4edd-a716-f23cc96296b4)


# Proyecto Modulo 4 API REST de Reservas Hoteleras

Proyecto realizado en Node.js, express.js, cors, dotenv y momentjs aplicando operaciones CRUD y diferentes tipos de endpoints.

## Requerimientos del proyecto

 - Desarrollar una API REST.
 - Aplicar las operaciones CRUD en un segmento de datos.
 - Trabajar con datos estructurados
 - Implementar la lógica de negocios

## Mi proyecto

Mi proyecto consiste en una API REST que cuenta con un modelo de reserva, con su correspondiente controlador y rutas.
La aplicación de reservas en hoteles que involucra las 4 operaciones CRUD y cuenta con diferentes endpoints relacionados con filtros, utilizando Node.js y Express.

# Estructura de carpetas de mi proyecto

```
Proyecto_Modulo_4
├─ controller
│  └─ bookingModel.js    
├─ model
│  └─ bookingModel.js 
├─ routes
│  └─ bookingRoutes
├─ .env
├─ .gitignore     
├─ index.js <- ARCHIVO DE ENTRADA
├─ README.md
├─ package-lock.json
└─ package.json

```

## Endpoints 

|Descripción del Endpoint|	Método|	Endpoint|	Información del endpoint|
|-----------------------|----------|----------|-------------|
|Crear reserva	| POST| 	/api/reservas| Este endpoint verifica previamente si existe algún otro usuario con el mismo número o correo, además asegura que las fechas ingresadas sean validas Ej: si están de entrada y salida están revés y si el número de huéspedes corresponde con el tipo de habitación.|
|Obtener la lista de reservas|	GET|	/api/reservas o /api/reservas?consulta_fecha=CONSULTA_FECHA| Este endponit retorna todas las reservas realizadas, y de forma opcional se puede ingresar además una fecha de consulta con el formato "DD-MM-YYYY" para hacer una búsqueda de todas las reservas con fecha de ingreso definida en la query.|
|Obtener información de una reserva específica	|GET|	/api/reservas/:id| Este endponit requiere ingresar como parámetro el id de una reserva para hacer una búsqueda y retorna en la respuesta toda la información de la misma.|
|Actualizar información de una reserva|	PUT|	/api/reservas/:id| Este endponit requiere ingresar como parámetro el id de una reserva para hacer una búsqueda y actualiza la información de la misma añadiendo los cambios escritos en el body, además verifica previamente si existe algún otro usuario con el mismo número o correo, que las fechas ingresadas sean validas y si el número de huéspedes corresponde con el tipo de habitación.|
|Eliminar una reserva específica	|DELETE|	/api/reservas/:id| Este endponit requiere ingresar como parámetro el id de una reserva para hacer una búsqueda y borra la información de la misma.|
|Filtrar reservas por hotel|	GET|	/api/reservas?hotel=HOTEL o api/reservas?hotel=HOTEL&consulta_fecha=CONSULTA_FECHA| Este endponit requiere ingresar una query que indique el nombre del hotel para retornar todas las reservas hechas en dicho hotel, y de forma opcional se puede ingresar además una fecha de consulta con el formato "DD-MM-YYYY" para hacer una búsqueda de todas las reservas del hotel escrito anteriormente, con fecha de ingreso en el mes que fue definido en la query|
|Filtrar reservas por rango de fechas|	GET|	/api/reservas?fecha_inicio=FECHA_INICIO&fecha_fin=FECHA_FIN| Este endponit requiere ingresar una fecha de inicio y otra de fin con el formato "DD-MM-YYYY" para hacer una búsqueda de todas las reservas con fecha de ingreso en el rango de fechas que fue definido en la query.|
|Filtrar reservas por tipo de habitación|	GET|	/api/reservas?tipo_habitacion=TIPO_HABITACION o /api/reservas?tipo_habitacion=TIPO_HABITACION&consulta_fecha=CONSULTA_FECHA|Este endponit requiere ingresar una query que indique el tipo de habitacion para retornar todas las reservas hechas en dicho tipo de habitacion, y de forma opcional se puede ingresar además una fecha de consulta con el formato "DD-MM-YYYY" para hacer una búsqueda de todas las reservas del tipo de habitacion escrito anteriormente, con fecha de ingreso en el mes que fue definido en la query.|
|Filtrar reservas por estado|	GET|	/api/reservas?estado=ESTADO o /api/reservas?estado=ESTADO&consulta_fecha=CONSULTA_FECHA| Este endponit requiere ingresar una query que indique el estado de pago de la reserva para retornar todas las reservas con el estado ingresado (pagado o pendiente), y de forma opcional se puede ingresar además una fecha de consulta con el formato "DD-MM-YYYY" para hacer una búsqueda de todas las reservas con el estado ingresado, con fecha de ingreso en el mes que fue definido en la query.|
|Filtrar reservas por número de huéspedes|	GET|	/api/reservas?num_huespedes=NUM_HUESPEDES o /api/reservas?num_huespedes=NUM_HUESPEDES&consulta_fecha=CONSULTA_FECHA| Este endponit requiere ingresar una query que indique el número de huéspedes para retornar todas las reservas que cuenten con dicha cantidad de personas, y de forma opcional se puede ingresar además una fecha de consulta con el formato "DD-MM-YYYY" para hacer una búsqueda de todas las reservas con el número de huéspedes ingresado, con fecha de ingreso en el mes que fue definido en la query.|


## Configuracion de variables de entorno

```
PORT=3001

```

## Estructura para crear una reserva

```
{
  "hotel": "Paraiso",
  "numGuests": "4",
  "roomCategory": "doble",
  "entryDate": "10-08-2024",
  "egressDate": "22-08-2024",
  "guestName": "Nombre Huesped",
  "guestEmail": "husped@gmail.com",
  "guestPhone": "569 55555555",
  "paymentStatus": "pagado"
}

```
#### Gracias por leer el readme