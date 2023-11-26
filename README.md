## Aclaraciones del Frontend
Es necesario colocar la URL del backend en el archivo [./frontend/js/general.js](./frontend/js/general.js)


## Aclaraciones del Backend
* En [./backend/app.py](./backend/app.py) se encuentra la siguiente línea de código:

    ```py
    db = Database(host='localhost', user='root', password='', database='databasesaboreseurolatinos') # Se conecta a la base de datos

    ```

    es necesario colocar tus datos en caso de que esos no sean los correctos

* Para iniciar el backend, colocar en la terminal

    ```
    cd backend
    ```

    para posicionarte en esa carpeta. Luego, ejecutar

    ```
    flask run --debug
    ```

    para iniciar el servidor backend con Flask
