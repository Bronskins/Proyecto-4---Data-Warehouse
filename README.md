# Proyecto 4 - Data Warehouse

La modalidad de trabajo seleccionada para el trabajo es **FREELANCE**

- Funcionalidad **EXPORTAR CONTACTO**S fue omitida.
- Funcionalidad **SUBIR FOTO DE CONTACTO** fue omitida.
- Funcionalidad **AGREGAR TAGS DE BUSQUEDA** fue incluida.

## Requerimientos 

Descargar [NodeJS](https://nodejs.org/en/download/) para poder iniciar el servidor web, [MySQL](https://dev.mysql.com/downloads/installer/) para la creacion de la base de datos y [Postman](https://www.postman.com/downloads/). 

# MySQL

Durante la instalacion de MySQL seguiremos los siguientes pasos:

1. Seleccionamos la version '**Developer Default**' que incluye MySQL Server y MySQL Shell para ejecutar archivos sql.

![1](https://i.ibb.co/QYhYKMG/1.png)

2. Las credenciales del usuario root deben ser las siguientes:

- **Usuario**: root
- **Contraseña**: acamica

![3](https://i.ibb.co/hCnVnJg/6.png)

3. Verificamos la conexion a nuestra base de datos mediante '**Check**'

![4](https://i.ibb.co/qmxnYNt/8.png)

4. Finalizar instalacion.

![5](https://i.ibb.co/sKGWkd9/9.png)

5. Ahora abriremos **MySQL Shell**

![6](https://i.ibb.co/L9rPQqn/21.png)

6. Primero cambiamos a modo SQL ingresando: `\sql` y apretamos enter. Deberiamos ver como cambia de **JS** a **SQL**:

![7](https://i.ibb.co/KLp7BWc/22.png)

7. Nos conectaremos a nuestra base de datos ingresando `\connect root@localhost`

![8](https://i.ibb.co/FzJPk45/24.png)

8. Ahora ingresamos la **contraseña** de nuestro usuario root, la cual definimos anteriormente (acamica)

![9](https://i.ibb.co/MPn6Jkg/23.png)

9. Si todo esta bien, la conexion se realizara exitosamente y veremos nuestro server con el nombre **'localhost:33060+ ssl'**

![10](https://i.ibb.co/4fTt74c/25.png)

10. Ahora ejecutaremos nuestro archivo **script.sql** que se encuentra dentro de nuestro repositorio. 

![11](https://i.ibb.co/n7QMX1X/26.png)

11. Para correr el script, debemos ingresar: `source *RUTA DEL ARCHIVO*`
- Por ejemplo: `source C:\Users\brons\OneDrive\Escritorio\proyecto4-master\backend\script.sql`

12. Si el script corrio bien, deberiamos ver algo como lo siguiente:

![12](https://i.ibb.co/NrmBhcG/28.png)

13. Cerrar MySQL Shell.

# NodeJS

1. Ahora instalaremos NodeJS en nuestro ordenador para tener un entorno de ejecucion en donde pueda correr nuestro servidor web.

![8](https://i.ibb.co/XsHvZ0C/19.png)

2. Seleccionaremos todo **Next** sin cambiar nada hasta completar la instalacion de NodeJS.

![9](https://i.ibb.co/5kScfFr/20.png)

3. Una vez instalado abriremos **Node.js command prompt** desde nuestra computadora.

![10](https://i.ibb.co/V3dnYC6/32.png)

4. Cambiamos el directorio apuntando hacia donde tengamos nuestros archivos utilizando: `cd *RUTA DEL ARCHIVO*`

![11](https://i.ibb.co/5FvmR1m/33.png)

5. Ahora ejecutaremos **`npm install`** para instalar todas las dependencias que tengamos en nuestro *package.json*. Cuando el proceso termine, deberias ver algo como esto:

![12](https://i.ibb.co/ZRjSmrh/34.png)

6. Estamos listos para correr nuestra API! Lo haremos ejecutando **`node app`**

![13](https://i.ibb.co/ZgMwvLq/35.png)


# Postman

1. Dentro del repositorio encontraras el archivo **'PostmanEndpoints.JSON'** que puedes importar desde Postman para agregar los llamados a los distintos endpoints.

![5](https://i.ibb.co/0M6RSDq/subir.jpg)

2. Desde **Postman**, hacemos click en File y luego **Import**

![6](https://i.ibb.co/3CZVgL2/12.png)

3. Buscamos nuestro archivo Postman.JSON y hacemos click en **Import**

![7](https://i.ibb.co/jbJgvrB/2.jpg.png)
![9](https://i.ibb.co/DCXzTKY/30.png)

4. Veremos nuestro listado de requests en Postman:

![8](https://i.ibb.co/sypNCc3/1.jpg)

# Postman: JSON Web Token

Tendras que agregar el header '**user-token**' para poder ejecutar las distintas operaciones. 

![9](https://i.ibb.co/bm1QvBt/user-token.jpg)

Para obtener el JWT deberas hacer un request al endpoint de **Login** ingresando un usuario y contraseña en el body. Si el usuario existe en la base de datos, el servidor devolvera el token.

![10](https://i.ibb.co/0sg0Lrc/3.jpg)


### Perfil ADMINISTRADOR

Los administradores podran realizar cualquier operacion CRUD pudiendo asi crear, modificar, eliminar u obtener: ciudades - regiones - paises - contactos - usuarios - compañias. La base de datos incluye un usuario administrador con el cual loguearse para probar los endpoints:

- **Usuario**: Bronskins
- **contraseña**: capo9090

### Perfil BASICO

Los perfiles basicos solo pueden gestionar los contactos, compañias y regiones. No pueden visualizar la seccion de 'Usuarios' para crear nuevos usuarios. Asi mismo, un middleware en los endpoints bloquean su acceso.

Tambien puedes crear un usuario sin rol de administrador desde el endpoint **CREAR USUARIO**.

* Profile 1 = BASICO
* Profile 2 = ADMINISTRADOR

![10](https://i.ibb.co/0j16fqr/Capture.jpg)

# Swagger

1. Para consultar la documentacion de Swagger, abriremos [Swagger Editor](https://editor.swagger.io/?_ga=2.148219767.1922553097.1620773966-887987671.1620773966) e importaremos nuestro archivo **Spec.yaml** que se encuentra dentro del repositorio.

![6](https://i.ibb.co/5j0tpw7/17.png)

2. Click en File >'**Import file**'

![6](https://i.ibb.co/xJNHPtB/16.png)

3. Buscamos nuestro archivo **Spec.Yaml** y lo seleccionamos. Deberiamos ver la documentacion de nuestra API.
