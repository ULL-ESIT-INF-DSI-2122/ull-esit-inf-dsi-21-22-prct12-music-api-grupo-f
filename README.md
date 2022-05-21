# Práctica 12 - Cliente y servidor para una aplicación de procesamiento de notas de texto
**Asignatura:** Desarrollo de sistemas informáticos  

**Nombres:**  
Leonardo Alfonso Cruz Rodríguez\
Eduardo González Pérez\
Jose Orlando Nina Orellana

**Correos:**   
alu0101233093@ull.edu.es  
alu0101319001@ull.edu.es\
alu0101322308@ull.edu.es

**GitHub Page:**
[Enlace](https://ull-esit-inf-dsi-2122.github.io/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-f/)

## Índice
- [Creación del directorio de trabajo y tareas previas](#id0)
- [Debugger TypeScript en VSC](#id0.1)
- [Mocha y Chai - Programación TDD](#id0.2)
- [Documentación con TypeDoc](#id0.3)
- [Cubrimiento de código utilizando Instanbul y Coveralls](#id0.4)
- [Integración continua de código fuente TypeScript a través de GitHub Action](#id0.5)
- [Calidad y seguridad del código fuente mediante Sonar Cloud](#id0.6)
- [Modelos de datos](#id1)
- [Implementación de routers](#id2)
- [Creación del servidor y conexión al clúster de MongoDB Atlas](#id3)
- [Creacion de clúster en MongoDB Atlas](#id3.1)

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

## Mocha y Chai - Programación TDD<a name="id0.2"></a>

Para seguir el paradigma de programación dirigido por pruebas (TDD) instalaremos los paquetes Mocha y Chai, las pruebas se almacenarán en el directorio `./tests`.  
```bash
$npm install -D mocha chai @types/mocha @types/chai ts-node
```
A continuación crearemos el fichero `.mocharc.json` para configurar Mocha con el siguiente contenido.
```json
{
	"extension": [
		"ts"
	],
	"spec": "tests/*.spec.ts",
	"require": "ts-node/register"
}
```
Por último, dentro del archivo `package.json`, cambiaremos la opción de test por Mocha. Quedaría de la siguiente manera:  
```json
{
  "name": "testingproyect",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^4.3.0",
    "@types/mocha": "^9.1.0",
    "chai": "^4.3.6",
    "mocha": "^9.2.1",
    "ts-node": "^10.7.0"
  }
}
```
Ahora solo faltaría crear los tests con la extensión `.spec.ts` dentro de la carpeta `tests`, y ejecutarlos con el siguiente comando:
```bash
$npm test
```

## Documentación con TypeDoc<a name="id0.3"></a>
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

## Cubrimiento de código utilizando Instanbul y Coveralls<a name="id0.4"></a>

Primero instalaremos los paquetes y dependencias necesarios para usar la herramientas:

```bash
$npm install -D nyc coveralls
```

A continuación, añadiremos en el fichero `package.json` un script para realizar el cubrimiento de código. `"coverage": "nyc npm test && nyc report --reporter=lcov"`.
El fichero quedaría de la siguiente manera:

```json
{
  "name": "p4",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha",
    "doc": "typedoc",
    "coverage": "nyc npm test && nyc report --reporter=lcov"
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

Para ejecutar este script simplemente introducimos por consola:
```bash
$npm run coverage
```

A continuación debemos entrar a la página web <a href = "http://www.coveralls.io/">coveralls.io</a> y habilitaremos el cubrimiento de código en nuestro proyecto.
(El proyecto debe estar en público para el uso de coveralls.io gratuito).

Ahora cuando ejecutemos por consola `npm run coverage` en la página del repositorio en `Coveralls` se nos mostrará la información del cubrimiento del código.
Para añadir el `Batch` del cubrimiento al `README.md` se copiará directamente de la página y se pegará en el fichero.

## Integración continua de código fuente TypeScript a través de GitHub Action<a name="id0.5"></a>
Antes de empezar, es importante hacer commit y push al repositorio remoto de lo que hemos hecho hasta el momento si deseamos añadir github actions desde la propia página
de github. Tambien es posible crear la carpeta con el contenido deseado e ignorar lo anteriormente mencionado.

Teniendo en cuenta lo anterior, el primer paso es instalar el paquete TypeScript:

```
$npm install -D typescript
```

Una vez instalado, entraremos a la página del repositorio y nos dirigiremos a Actions, y dentro de dicho apartado bajaremos hasta Continuous integration.
![image](https://user-images.githubusercontent.com/72469549/160702017-d769658d-cfc4-4ecc-a0d5-ca4caa187c8f.png)  

Buscaremos `Node.js` y le daremos a `Set up this workflow`.

![image](https://user-images.githubusercontent.com/72469549/160702039-bf36ceec-f903-4155-8450-32a70b19f276.png)  

Una vez dentro es importante cambiar el final del fichero por el siguiente contenido:

```
steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm install
    - run: npm test
```

Y realizamos un commit para guardar el fichero generado. Opcionalmente se puede añadir un `badge` en al informe en las siguientes opciones:

![image](https://user-images.githubusercontent.com/72469549/160701932-68d8d9b2-d347-49eb-90c7-76736f17073f.png)

![image](https://user-images.githubusercontent.com/72469549/160701954-2845ea6d-4a1e-4aaf-88c6-31a35a0ee546.png)

A continuación crearemos el fichero `coveralls.yml` y le pondremos el siguiente contenido:

```yml
name: Coveralls

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - name: Cloning repo
      uses: actions/checkout@v2
    - name: Use Node.js 16.x
      uses: actions/setup-node@v2
      with:
        node-version: 16.x
    - name: Installing dependencies
      run: npm install
    - name: Generating coverage information
      run: npm run coverage
    - name: Coveralls GitHub Action
      uses: coverallsapp/github-action@master
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}

```

Ahora con cada push se comprobarán los tests y el recubrimiento de código automáticamente y se podrá revisar en Github Actions.

## Calidad y seguridad del código fuente mediante Sonar Cloud y GitHub Actions<a name="id0.6"></a>

Para poder utilizar la herramienta `Sonar Cloud` debemos tener el repositorio en una organización. En este caso lo tendremos alojado en la organización de la asignatura.
Una vez creada la cuenta en la página <a href = "http://www.sonarcloud.io/">sonarcloud.io</a> añadiremos el repositorio dándole al símbolo `+`. Veremos que nos analizará 
el proyecto.

A continuación, deberemos ir al apartado `administration` y en el desplegable seleccionaremos `analysis method` y desactivaremos el análisis automático.
El siguiente paso sería entrar en el tutorial de github actions, copiaremos el `SONAR_TOKEN`, accedemos al apartado settings del repositorio, entramos en secrets,
dentro le daremos a actions y añadiremos un nuevo secreto con el título y el valor que nos ha dado la `Sonar Cloud`.

Una vez añadido el secreto, en la página de `Sonar Cloud` le daremos a `continue`. Seleccionaremos *Other* ya que este proyecto está programado en TS y nos mostrará el 
contenido que deberá tener el fichero de flujo de trabajo en github actions. Por lo tanto, el siguiente paso sería crear el fichero `sonarcloud.yml` dentro del directorio
`.github/workflows` y copiaremos el contenido dado por la página. Es necesario cambiar un poco el archivo y añadir pasos, el fichero quedaría de la siguiente manera:

```yml
name: Sonar-Cloud 

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    steps:
      - name: Cloning repo
        uses: actions/checkout@v2
        with:
          fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis
      - name: Use Node.js 16.x
        uses: actions/setup-node@v2
        with:
          node-version: 16.x
      - name: Installing dependencies
        run: npm install
      - name: Generating coverage report
        run: npm run coverage
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Needed to get PR information, if any
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

El paso siguiente sería crear el fichero `sonar-project.properties` y pegar el contenido dado por la página. Modificandolo un poco quedaría de la siguiente manera:

```properties
sonar.projectKey=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101233093
sonar.organization=ull-esit-inf-dsi-2122

# This is the name and version displayed in the SonarCloud UI.
sonar.projectName=ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101233093
sonar.projectVersion=1.0

# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
sonar.sources=src

# Encoding of the source code. Default is default system encoding
sonar.sourceEncoding=UTF-8

# Coverage info
sonar.javascript.lcov.reportPath=coverage/lcov.info
```

Y ya estaría configurada la `Gihub Actions` de `Sonar Cloud`. Por último, para añadir el badge a la documentación del proyecto, nos dirigiremos al apartado de información
abajo a la izquierda y copiaremos el badge.

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


## Creación del servidor y conexión al clúster de MongoDB Atlas<a name="id3"></a>

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

## Creacion de clúster en MongoDB Atlas<a name="id3.1"></a>

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
