## Instalación (en windows) 🔧
Posicionado en la carpeta [backend](./), crea un entorno virtual con el comando

```bash
py -3 -m venv .venv
```

Luego actívalo con el comando

```bash
.venv\Scripts\activate
```

A continuación, instala las dependencias con el comando

```bash
pip install -r requirements.txt
```

Es necesario crear variables de entorno mediante la elaboración de un archivo .env en el mismo nivel que la carpeta src. Este archivo debe completarse con los siguientes campos, los cuales deben modificarse con tus propias credenciales en lugar del valor "X":

```env
# Estos cuatro valores corresponden a tus credenciales de la base de datos
DB_HOST = X
DB_USER = X
DB_PASSWORD = X
DB_DATABASE = X

URL_FRONTEND1 = x # URL del frontend que desees dar permisos de acceso, sin barra lateral final

TOKEN_API = # Cadena de caracteres utilizado como mecanismo de autenticación para asegurar que solamente los usuarios que presenten este token en los encabezados de sus solicitudes puedan acceder al backend. Importante: Su valor tiene que ser el mismo que el de la variable de entorno VITE_TOKEN_API que ponés en el frontend

DEBUG = X # Debe ser un string. Coloca "" si querés que no se ejecute en modo depuración, colocar cualquier otro valor para el caso contrario
```

## Despliegue 📦
Para ambos métodos, recuerda siempre tener activado el entorno virtual antes de empezar.

### Método 1:
* Inicia el servidor web Flask con el comando:
    ```bash
    flask run
    ```

* o de la siguiente manera si deseas iniciarlo en modo de depuración:
    ```bash
    flask run --debug
    ```

### Método 2
* Inicia el servidor web Flask ejecutando el script [app.py](./app.py) desde tu entorno de desarrollo. Si se inicia en modo depuración o no, dependerá del valor de la variable de entorno `DEBUG`

Asegúrate de que la parte frontend esté ejecutándose
