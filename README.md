# Práctica 12 - Cliente y servidor para una aplicación de procesamiento de notas de texto
**Asignatura:** Desarrollo de sistemas informáticos  

**Nombres:**  
Leonardo Alfonso Cruz Rodríguez  
Eduardo González Pérez  
Jose Orlando Nina Orellana

**Correos:**   
alu0101233093@ull.edu.es  
alu0101319001@ull.edu.es  
alu0101322308@ull.edu.es

**GitHub Page:**
[Enlace](https://ull-esit-inf-dsi-2122.github.io/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-f/)

## Índice
- [Creación del directorio de trabajo y tareas previas](#id0)
- [Debugger TypeScript en VSC](#id0.1)
- [Documentación con TypeDoc](#id0.2)
- [Modelos de datos](#id1)
- [Implementación de routers](#id2)
- [Creacion de clúster en MongoDB Atlas](#id3)
- [Creación del servidor y conexión al clúster de MongoDB Atlas](#id3.1)
- [Peticiones con la extensión Thunder Client](#id4)

## Creación del directorio de trabajo y tareas previas<a name="id0"></a>
Antes de empezar el proyecto es necesario instalar diversos paquetes para tener una estructura de directorios adecuada. Para ello el primer paso es crear el directorio principal:
```bash
$mkdir P12
$cd P12/
```
Una vez dentro, ejecutaremos los siguientes comandos:
```bash
$npm init --yes
$npm install -D eslint eslint-config-google @typescript-eslint/eslint-plugin @typescript-eslint/parser
$tsc --init
$mkdir src
$mkdir tests
$touch README.md
```

Tras ejecutarlos habremos inicializado el Node Project Manager con la herramienta Eslint y el compilador de TypeScript. Además de crear los directorios donde estará almacenado el código y el fichero `README.md`.  
  
El siguiente paso es configurar el fichero `tsconfig.json` descomentando las siguientes lineas dentro del fichero:
- `rootDirs` se debe indicar el directorio `src` para almacenar el código principal, la carpeta `tests` será para almacenar las pruebas a la hora de programar en TDD.  
```json
"rootDirs": ["./src","./tests"]
```
- `declaration` se requerirá para usar el debugger.  
```json
"declaration": true
```  
- `sourceMap` se necesita cuando se exportan funciones.  
```json
"sourceMap": true
```
- `outDir` para almacenar los archivos compilados en un directorio concreto.  
```json
"outDir": "./dist"
```

Por último, faltaría iniciar el directorio git. Pero antes, crearemos el fichero `.gitignore` para evitar que git tenga en seguimiento lo que introduzcamos en dicho archivo.
```bash
$touch .gitignore
$cat .gitignore
node_modules/
dist/
package-lock.json
.vscode/
```
Ahora si, y para finalizar, iniciaremos el repositorio git y añadiremos el remoto:
```bash
$git init
$git remote add origin git@github.com:ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101233093.git   
```

## Debugger TypeScript en VSC<a name="id0.1"></a>
Para utilizar el debugger en nuestro proyecto pincharemos en el icono de la barra situada a la izquierda:  
  
![image](https://user-images.githubusercontent.com/72469549/156930570-8ada3bf7-a9b6-4ff4-acb3-77925e9298d6.png)
  
A continuación pinchamos en `cree un archivo launch.json` y se abrirá el siguiente menu desplegable:
  
![image](https://user-images.githubusercontent.com/72469549/156930748-8ce798ba-fa91-4f74-a026-1cb969c18514.png)

Seleccionaremos `Node.js` y se abrirá el fichero `launch.json`. En él solo habrá que cambiar la dirección de `outFiles`, quedaría de la siguiente manera:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/src/ejemplo.ts",
            "outFiles": [
                "${workspaceFolder}/dist/**/*.js"
            ]
        }
    ]
}
```

Para debuggear un archivo, debe compilarse previamente y darle al botón verde en la parte superior.  
  
![image](https://user-images.githubusercontent.com/72469549/156931099-b62aecbb-80c9-441f-96dd-493d35cf9052.png)

## Documentación con TypeDoc<a name="id0.2"></a>
El primer paso para realizar la documentación con la herramienta `TypeDoc` sería instalar la librería correspondiente:
```bash
$npm install -D typedoc
```
A continuación se debe crear el archivo `typedoc.json` para escribir la configuración con los parámetros necesarios, el contenido del fichero quedaría como se ve a continuación:
```json
{
    "entryPoints": [
        "./src/ejemplo-1",
        "./src/ejemplo-2"
    ],
    "out": "./docs"
}
```
Cabe destacar que en el parámetro `entryPoints` deben ir los ficheros que se van a documentar uno por uno.  
El paso siguiente sería escribir la documentación en nuestro código. Para ello debemos escribir `/**` encima de una función y nos aparecerá lo siguiente:  
  
![image_2022-03-08_19-23-34](https://user-images.githubusercontent.com/72469549/157311335-0db0a914-62f8-4cd4-b4da-18b6d01a6f03.png)

Teclearemos enter y se nos generará automáticamente una plantilla por defecto para escribir la documentación a cerca de la función.

![image](https://user-images.githubusercontent.com/72469549/157311857-05a84b71-e88b-4816-adb3-f05ca75f08fb.png)

El siguiente paso sería rellenarla, por ejemplo de la siguiente manera:

```typescript
/**
 * Saluda al mundo un número de veces determinado
 * @param veces Almacena el número de veces que se saludará
 * @returns La cadena con los saludos concatenados
 */
function hello(veces: number): string {
    let hi = "";
    for(let i = 0; i < veces; i++)
        hi += "¡Hello world! ";
    return hi;
}
```

Por último, debemos añadir al fichero `package.json` un parámetro que nos permitirá ejecutar la documentación con el comando `npm run doc` y se guardaría en `./docs`.  
El fichero quedaría de la siguiente manera:

```json
{
  "name": "p4",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha",
    "doc": "typedoc"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^4.3.0",
    "@types/mocha": "^9.1.0",
    "chai": "^4.3.6",
    "mocha": "^9.2.1",
    "ts-node": "^10.7.0",
    "typedoc": "^0.22.13"
  }
}
```

## Modelos de datos<a name="id1"></a>

### Modelo artist
Primero crearemos la interfaz `ArtistDocumentInterface` que hereda de `Document` con los atributos:
 - `name:` nombre del artista
 - `genres:` géneros del artista
 - `MonthlyListeners:` número de oyentes mensuales
 - `songs:` canciones del artista

Después crearemos el el esquema `ArtistSchema` usando como argumento el tipo ArtistDocumentInterface.
  - **name:**
    - Tipo: String
    - Único: True
    - Requerido: True
    - Trim (Quitar espacios al final y principio de la cadena): True
    - Validate: Comprueba que los caracteres pertenecen al conjunto ascii o al alfabeto del lenguaje español

  - **genres:**
    - Tipo: String[]
    - Requerido: True
    - Trim (Quitar espacios al final y principio de la cadena): True
    - Validate: Comprueba que los caracteres pertenecen al conjunto ascii o al alfabeto del lenguaje español

  - **songs:**
    - Tipo: String[]
    - Único: True
    - Requerido: True
    - Trim (Quitar espacios al final y principio de la cadena): True
    - Validate: Comprueba que los caracteres pertenecen al conjunto ascii o al alfabeto del lenguaje español

  - **monthlyListeners:**
    - Tipo: String
    - Único: True
    - Requerido: True
    - Trim (Quitar espacios al final y principio de la cadena): True
    - Validate: Comprueba que los caracteres pertenecen al conjunto ascii o al alfabeto del lenguaje español

Por último, se exporta el modelo como `Artist`.
```typescript
export const Artist = model('Artist', ArtistSchema);
```

### Modelo song
Primero crearemos la interfaz `SongDocumentInterface` que hereda de `Document` con los atributos:
 - `name:` nombre de la canción
 - `autor:` nombre el autor de la canción
 - `duration:` duración de la canción 
 - `genres:` géneros de la canción
 - `single:` si es single o no
 - `numberReproductions:` número de reproducciones 

Después crearemos el el esquema `SongSchema` usando como argumento el tipo SongDocumentInterface.
  - **name:**
    - Tipo: String
    - Requerido: True
    - Trim (Quitar espacios al final y principio de la cadena): True
    - Validate: Comprueba que los caracteres pertenecen al conjunto ascii o al alfabeto del lenguaje español

  - **autor:**
    - Tipo: String
    - Requerido: True
    - Trim (Quitar espacios al final y principio de la cadena): True
    - Validate: Comprueba que los caracteres pertenecen al conjunto ascii o al alfabeto del lenguaje español

  - **duration:**
    - Tipo: Number
    - Requerido: True
    - Valor mínimo: 0.0
    - Valor por defecto: 0.0
    - Validate: Comprueba que el número sea de tipo `Float`

  - **genres:**
    - Tipo: String[]
    - Requerido: True
    - Trim (Quitar espacios al final y principio de la cadena): True
    - Validate: Comprueba que los caracteres pertenecen al conjunto ascii o al alfabeto del lenguaje español

  - **single:**
    - Tipo: Boolean
    - Requerido: True

  - **numberReproductions:**
    - Tipo: Number
    - Requerido: True
    - Trim (Quitar espacios al final y principio de la cadena): True
    - Valor mínimo: 0
    - Valor por defecto: 0

Por último, se exporta el modelo como `Song`.
```typescript
export const Song = model('Song', SongSchema);;
```

### Modelo playlist
Primero crearemos la interfaz `PlaylistDocumentInterface` que hereda de `Document` con los atributos:
 - `name:` nombre de la playlist
 - `songs:` canciones que contiene la playlist
 - `duration:` duración de la playlist
 - `genres:` géneros de la playlist

Después crearemos el el esquema `PlaylistSchema` usando como argumento el tipo PlaylistDocumentInterface.
  - **name:**
    - Tipo: String
    - Único: True
    - Requerido: True
    - Trim (Quitar espacios al final y principio de la cadena): True
    - Validate: Comprueba que los caracteres pertenecen al conjunto ascii o al alfabeto del lenguaje español

  - **songs:**
    - Tipo: String[]
    - Único: True
    - Requerido: True
    - Trim (Quitar espacios al final y principio de la cadena): True
    - Validate: Comprueba que los caracteres pertenecen al conjunto ascii o al alfabeto del lenguaje español

  - **duration:**
    - Tipo: Number
    - Requerido: True
    - Valor mínimo: 0.0
    - Valor por defecto: 0.0
    - Validate: Comprueba que el número sea de tipo `Float`

  - **genres:**
    - Tipo: String[]
    - Requerido: True
    - Trim (Quitar espacios al final y principio de la cadena): True
    - Validate: Comprueba que los caracteres pertenecen al conjunto ascii o al alfabeto del lenguaje español

Por último, se exporta el modelo como `Playlist`.
```typescript
export const Playlist = model('Playlist', PlaylistSchema);
```

## Implementación de routers<a name="id2"></a>
Para que nuestra API Rest funcione, es indispensable implementar `routers` que gestionen las peticiones.
Para cada modelo de dato, existe la siguiente lista de routers:

  - **POST:**
    Permite la creación de documentos en la base de datos. Se le pasarían los atributos por medio de un JSON en el `body` de la petición, con esa información crearíamos un documento según el modelo definido y a continuación se llamaría al método `save()` que nos devolverá una promesa. 
    Si todo funciona correctamente devolverá el código estado `201`, en caso de error se devolvería el código de estado `400`.

  - **GET:**
    Existen dos variantes de peticiones GET:
    - Petición GET por id:
      Buscará en la base de datos utilizando la `id` del documento. Para ello, recoge la id que se pasará como parámetro, por medio del atributo `req.params.id`. Con él, se le aplica sobre el módulo de datos concreto, la función `findById()`, que mediante promesas, obtenemos los datos que devuelve. Si son undefined, devolverá el estádo `400`, en otro caso, devolverá los datos con el estado `200`. En caso de que la propia función encuentre un error en su ejecución, se devolverá el estado `500`, junto con el propio error retornado. 

    - Petición GET por nombre:
      Buscará en la base de datos utilizando el atributo `name`. Este atributo lo recibiremos como una _query string_, por lo que primero comprobamos su existencia. En caso de existir, usaremos como filtro de búsqueda un objeto que contiene la propiedad `name`, con el valor correspondiente pasado por el _query string_. En caso contrario, obtendremos un objeto vacío como filtro, que resultará en mostrar todos los objetos registrados en la base de datos. Esto será resultado de la función `find()`, a la que le pasaremos el filtro obtenido y como promesa retornará los datos obtenidos. Si son vacios, se devolverá el estado `404`, en otro caso, se enviarán los datos correspondientes junto el estado `200`. En caso de fallar la función, se retornará el estado `500`, junto al error en cuestión. 

  - **DELETE:**
    Existen dos variantes de la petición DELETE: 
    - Petición DELETE por id: 
      Buscará y eliminara de la base de datos el objeto correspondiente con el atributo `id` indicado. Para ello, le pasaremos dicha `id` como parámetro de la búsqueda, y será utilizado como filtro de búsqueda en la función `findByIdAndDelete()`, que retornará como promesa los datos correspondientes. En caso de datos vacíos, se enviará el estado `404`; si es correcto, se enviará los datos eliminados de la base de datos, junto al estado `200`; en caso de un error en la función, se enviará el estado `400`, junto a la información del error. 
    - Petición DELETE por nombre:
      Buscará y eliminará de la base de datos el objeto correspondiente con el atributo `name` indicado. Para ello, le pasaremos el atributo `name` por una _query string_. En caso de que no se le pase dicho atributo, se retornará un estado `400`, junto con un objeto con la propiedad `error`, que contiene un mensaje indicando que se debe proporcionar un nombre. Si así sucede, se realizará la función `findOneAndDelete()`, pasandole como un filtro un objeto con la propiedad `name` y el valor correspondiente obtenido de la _query string_. Como promesa, se obtendrá los datos devueltos: si son vacíos, se retornará el estado `404`; en otro caso, se retornará el estado `200`, junto con los datos que se han eliminado. En caso de que la función de un error, se enviará el estado `400` junto al error en cuestión.
  

  - **PATCH:**
    Existen dos variantes de la petición PATCH: 
    - Petición PATCH por id: 
      Buscará el objeto de la base de datos correspondiente mediante su `id` y realizará las modificaciones en el mismo en base a la información pasada en el `body`. De esta forma, se comprobará que las propiedades del objeto pasado en el `body`, corresponden con las propiedas existentes en el modelo que se está modificando. De no ser el caso, se enviará un estado `400` junto a un objeto que contiene el mensaje _"Update is not permitted"_. Si las propiedades introducidas son válidas para el modelo de datos correspondiente, se realizará la función `findByIdAndUpdate()`, a la que le pasamos el parámetro obtenido con la `id`, que actuará como filtro; los datos a actualizar contenidos en `body`, y un objeto en el que indicamos las opciones `new` como **true**, ya que deseamos obtener los datos correspondientes tras la actualización, y `runValidators` como **true**, que ejecutará los validadores definidos en el modelo de datos correspondiente con los nuevos datos pasados. De esta forma, como promesa, obtendremos los datos devueltos por dicha función. Si estos datos son vacios, retornaremos el estado `404`; en otro caso, devolveremos el estado `200`, junto con los datos correspondientes. Si está función llegase a fallar, se devolverá el estado `400`, junto con el error en cuestión. 

    - Petición PATCH por nombre:
      Buscará el objeto de la base de datos correspondiente mediante su `name` y realizará las modificaciones en el mismo en base a la información pasada en el `body`. De esta forma, se comprobará que las propiedades del objeto pasado en el `body`, corresponden con las propiedas existentes en el modelo que se está modificando. De no ser el caso, se enviará un estado `400` junto a un objeto que contiene el mensaje _"Update is not permitted"_. A parte, se deberá pasar el nombre a buscar como una _query string_; en caso contrario, se retornará el estado `400`, junto al objeto con propiedad `error` con el mensaje pertinente. Si las propiedades introducidas son válidas para el modelo de datos correspondiente, se realizará la función `findByIdAndUpdate()`, a la que le pasamos el parámetro obtenido con la `name`, que actuará como filtro; los datos a actualizar contenidos en `body`, y un objeto en el que indicamos las opciones `new` como **true**, ya que deseamos obtener los datos correspondientes tras la actualización, y `runValidators` como **true**, que ejecutará los validadores definidos en el modelo de datos correspondiente con los nuevos datos pasados. De esta forma, como promesa, obtendremos los datos devueltos por dicha función. Si estos datos son vacios, retornaremos el estado `404`; en otro caso, devolveremos el estado `200`, junto con los datos correspondientes. Si está función llegase a fallar, se devolverá el estado `400`, junto con el error en cuestión. 

  - **DEFAULT:**
    En caso de introducir una ruta diferente a la esperada, se activará este router, que devolverá como respuesta el estado `501`. 

## Creacion de clúster en MongoDB Atlas<a name="id3"></a>

Primero nos registraremos en la página de [MongDB Atlas](https://www.mongodb.com/es) con el correo institucional.

A continuación crearemos un clúster. Escogeremos un clúster compartido ya que es gratuito. Dejamos todas la opciones por defecto.

![Creación Cluster](https://gyazo.com/e5817cf2ce88842dc6311848f680256c.png)

Haremos click en Network Access que es una lista de IPs desde la cuáles se puede acceder al clúster. Pulsaremos en Add IP Address y seleccionaremos Allow Access from anywhere, de este modo se podrá acceder al clúster desde cualquier IP.

![Network Access](https://gyazo.com/428908214089fafcde454ab46abf187e.png)

Luego de esto nos dirigiremos Database Access que nos permite filtrar los usuarios, sus permisos y tipos de autenticación a los clústers. Pulsaremos en Add New Database User, ya dentro seleccionaremos como modo de autenticación Password, crearemos un nuevo usuario llamado admin y crearemos una contraseña para ese usuario.

![Database User](https://gyazo.com/5f23559ff1c0a20b4e040060f65501f6.png)

Le podemos asignar roles o especificar privilegios, pero en nuestro caso solo le asignaremos el role Atlas admin. Para terminar pulsaremos en Add User.

![Privilegios](https://gyazo.com/ed43c84820f9c87ea0d005eac7a0468d.png)

Una vez que vayamos realizando peticiones y adiciones a la base de datos, finalmente, podremos visualizar en la sección de **Collections**, el resultado de dichas peticiones y el almacenamiento permanente de nuestros datos: 

![Collections](https://gyazo.com/debe9e9f34331239a20ae7b5e4347d3a.png)

## Creación del servidor y conexión al clúster de MongoDB Atlas<a name="id3.1"></a>

Antes de todo crearemos el fichero `.env` que contendrá las variables de entorno `MONGODB_URL`, que es la URL para conectarse al 
clúster de MongoDB Atlas, y `PORT`, el puerto 8000.

Declararemos la variable `dbURI` que puede ser o la variable de entorno `MONGODB_URL` o una base de datos local llamada `music-app`.
Nos intentaremos conectar al clúster de MongoDB Atlas usando `connect` pasandole como parámetros la variable `dbURI` y una serie de opciones. Esto devuelve una promesa, que en caso de éxito mostraremos por pantalla un mensaje indicando que se ha conectado con el servidor y en caso de error mostraremos un mensajes indicando que no se ha podido conectar con el servidor.

```typescript
import { connect } from 'mongoose';
require("dotenv").config();

const dbURI = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/music-app";

connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Connection to MongoDB server established');
}).catch(() => {
    console.log('Unable to connect to MongoDB server');
});
```

Primero que nada importar el fichero ./db/mongoose creado anteriormente para poder realizar la conexión con el clúster. Crearemos el servidor `app` con exprress e indicaremos que usaremos JSON y todos los routers de la carpeta routers (SongRouter, ArtistRouter, PlaylistRouter, DefaultRouter). Crearemos una variable `port` que será la variable de entorno `PORT` o 3000. Por último escucharemos con `listen` en el puerto indicado.

```typescript
import * as express from 'express';
import './db/mongoose';
import { SongRouter } from './routers/song';
import { ArtistRouter } from './routers/artist';
import { PlaylistRouter } from './routers/playlist';
import { DefaultRouter } from './routers/default';

const app = express.default();
app.use(express.json());
app.use(SongRouter);
app.use(ArtistRouter);
app.use(PlaylistRouter);
app.use(DefaultRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server has started at port ', port);
});
```

## Peticiones con la extensión Thunder Client<a name="id4"></a>

### **Petición DEFAULT**
Tipo: GET  
URL: https://grupo-f-music-app.herokuapp.com/  
Resultado:  
![image](https://user-images.githubusercontent.com/72469549/169702084-49c187f3-cd56-4193-bc58-0636aca6a3b5.png)

### **Petición POST**
URL: https://grupo-f-music-app.herokuapp.com/artist  
Body:
```json
  {
    "name": "Frank Sinatra",
    "genres": [
      "Jazz"
    ],
    "monthlyListeners": 10938478,
    "songs": [
      "Fly Me To The Moon",
      "That's Life",
      "My Way",
      "Theme From New York, New York"
    ]
  }
```

Resultado:  
![image](https://user-images.githubusercontent.com/72469549/169701375-a9a383b0-0f36-4113-8665-4275aa5c2620.png)
```json
{
  "genres": [
    "Jazz"
  ],
  "songs": [
    "Fly Me To The Moon",
    "That's Life",
    "My Way",
    "Theme From New York, New York"
  ],
  "monthlyListeners": 10938478,
  "_id": "628a4d3dd8426d0016a16189",
  "name": "Frank Sinatra",
  "__v": 0
}
```

### **Petición GET con código de estado 200**
URL: https://grupo-f-music-app.herokuapp.com/song?name=Lazy song  
Resultado:  
![image](https://user-images.githubusercontent.com/72469549/169701399-3fea2a7b-fa64-4ba0-bb87-eba69715571b.png)
```json
[
  {
    "duration": 3.09,
    "genres": [
      "Pop"
    ],
    "numberReproductions": 579789618,
    "_id": "628920dc8f4b200016efdfa8",
    "name": "Lazy song",
    "author": "Bruno Mars",
    "single": true,
    "__v": 0
  }
]
```


### **Petición GET con código de estado 404**
URL: https://grupo-f-music-app.herokuapp.com/artist?name=David Bis  
Resultado:  
![image](https://user-images.githubusercontent.com/72469549/169701470-9c4f3e88-52e1-44db-b8b0-5379dc8bfaab.png)


### **Petición GET con código de estado 500**
URL: https://grupo-f-music-app.herokuapp.com/playlist/628927043731ab00162b462q  
Resultado:  
![image](https://user-images.githubusercontent.com/72469549/169701532-080e0de6-b9dc-4fe2-b8e6-6dcf4a72732e.png)
```json
{
  "stringValue": "\"628927043731ab00162b462q\"",
  "valueType": "string",
  "kind": "ObjectId",
  "value": "628927043731ab00162b462q",
  "path": "_id",
  "reason": {},
  "name": "CastError",
  "message": "Cast to ObjectId failed for value \"628927043731ab00162b462q\" (type string) at path \"_id\" for model \"Playlist\""
}
```

### **Petición PATCH con código de estado 200**
URL: https://grupo-f-music-app.herokuapp.com/artist?name=Frank Sinatra  
Body:
```json
  {
    "name": "Frank Sinatra",
    "genres": [
      "Jazz"
    ],
    "monthlyListeners": 10938578,
    "songs": [
      "Fly Me To The Moon",
      "That's Life",
      "My Way",
      "Theme From New York, New York"
    ]
  }
```
Resultado:  
![image](https://user-images.githubusercontent.com/72469549/169701589-220e10a1-6c4c-4264-a888-ab653b6fb29f.png)
```json
{
  "genres": [
    "Jazz"
  ],
  "songs": [
    "Fly Me To The Moon",
    "That's Life",
    "My Way",
    "Theme From New York, New York"
  ],
  "monthlyListeners": 10938578,
  "_id": "628a4d3dd8426d0016a16189",
  "name": "Frank Sinatra",
  "__v": 0
}
```

### **Petición PATCH con código de estado 400**
URL: https://grupo-f-music-app.herokuapp.com/artist?name=Frank Sinatra  
Body: 
```json
  {
    "error": "error",
    "name": "Frank Sinatra",
    "genres": [
      "Jazz"
    ],
    "monthlyListeners": 10938478,
    "songs": [
      "Fly Me To The Moon",
      "That's Life",
      "My Way",
      "Theme From New York, New York"
    ]
  }
```
Resultado:  
![image](https://user-images.githubusercontent.com/72469549/169701615-4aeef73e-cb6e-4b33-8bf2-bba8cc1fae84.png)
```json
{
  "stringValue": "\"fa12\"",
  "valueType": "string",
  "kind": "Number",
  "value": "fa12",
  "path": "monthlyListeners",
  "reason": {
    "generatedMessage": true,
    "code": "ERR_ASSERTION",
    "actual": false,
    "expected": true,
    "operator": "=="
  },
  "name": "CastError",
  "message": "Cast to Number failed for value \"fa12\" (type string) at path \"monthlyListeners\""
}
```

### **Petición PATCH con código de estado 404**
URL: https://grupo-f-music-app.herokuapp.com/playlist?name=Playlist N2  
Resultado:  
![image](https://user-images.githubusercontent.com/72469549/169701655-2c029cf6-0568-49b6-b744-66874f632ec6.png)

### **Petición DELETE con código de estado 200**
URL: https://grupo-f-music-app.herokuapp.com/artist?name=Frank Sinatra  
Resultado:  
![image](https://user-images.githubusercontent.com/72469549/169701685-bd61b30d-a79f-4020-9302-d43410fbb40e.png)
```json
{
  "genres": [
    "Jazz"
  ],
  "songs": [
    "Fly Me To The Moon",
    "That's Life",
    "My Way",
    "Theme From New York, New York"
  ],
  "monthlyListeners": 10938578,
  "_id": "628a4d3dd8426d0016a16189",
  "name": "Frank Sinatra",
  "__v": 0
}
```

### **Petición DELETE con código de estado 400**
URL: https://grupo-f-music-app.herokuapp.com/song  
Resultado:  
![image](https://user-images.githubusercontent.com/72469549/169701711-09b6167d-04f1-4f73-b8d3-60659041cc0b.png)
```json
{
  "error": "A name must be provided"
}
```

### **Petición DELETE con código de estado 404**
URL: https://grupo-f-music-app.herokuapp.com/artist?name=David  
Resultado:  
![image](https://user-images.githubusercontent.com/72469549/169701739-0bd07f6d-aaa5-403d-a612-399e88436e80.png)

