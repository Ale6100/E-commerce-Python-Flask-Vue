from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from dotenv import load_dotenv
import os
import mysql.connector

load_dotenv()

variables_database = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password':os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_DATABASE')
}

frontends_enabled = [os.getenv('URL_FRONTEND2')]

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": frontends_enabled}}) # Permite peticiones desde los frontends de la lista

class Database: # Creamos una clase para iniciar la base de datos y crear las tablas necesarias
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host = host,
            user = user,
            password = password
        )
        self.cursor = self.conn.cursor(dictionary=True)

        if self.conn.is_connected():
            print("Base de datos conectada")
        else:
            raise Exception("No se pudo conectar a la base de datos")

        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        # Crea la tabla reviews si no existe
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS reviews (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            country VARCHAR(50) NOT NULL,
            image VARCHAR(255) NOT NULL,
            review VARCHAR(255) NOT NULL,
            score DECIMAL(10,2) NOT NULL,
            author VARCHAR(50) NOT NULL,
            date VARCHAR(50) NOT NULL
            )
            ''')
        self.conn.commit()

    def close_connection(self): # Realmente no lo usamos, pero por ahora lo dejamos
        self.cursor.close()
        self.conn.close()

db = Database(**variables_database) # Se conecta a la base de datos

class Reviews(): # Creamos esta clase para interactuar con la tabla reviews
    def __init__(self, db: Database): # Se asocia con la base de datos que le pasemos como parámetro
        self.db = db

    def get_all(self): # Retorna todos los registros de la tabla
        self.db.cursor.execute("SELECT * FROM reviews")
        reviews = self.db.cursor.fetchall()
        return reviews

    def insert_one(self, title: str, country: str, image: str, review: str, score: float, author: str, date: str): # Inserta un solo registro y lo retorna
        sql = "INSERT INTO reviews (title, country, image, review, score, author, date) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        values = (title, country, image, review, score, author, date)
        self.db.cursor.execute(sql, values)
        self.db.conn.commit()

        self.db.cursor.execute("SELECT * FROM reviews WHERE id = LAST_INSERT_ID()")
        new_review = self.db.cursor.fetchone()
        return new_review

    def update_one(self, id: int, incoming_values: dict[str, str | float]): # Actualiza un solo registro y lo retorna
        sql = "UPDATE reviews SET "
        values = []

        for indice, (key, value) in enumerate(incoming_values.items()):
            sql += f"{key} = %s"
            values.append(value)
            if indice < len(incoming_values) - 1:
                sql += ", "

        sql += f" WHERE id = {id}"

        self.db.cursor.execute(sql, values)
        self.db.conn.commit()

        self.db.cursor.execute(f"SELECT * FROM reviews WHERE id = {id}")
        new_review = self.db.cursor.fetchone()
        return new_review

    def delete_one(self, id: int): # Elimina un solo registro
        sql = f"DELETE FROM reviews WHERE id = {id}"
        self.db.cursor.execute(sql)
        self.db.conn.commit()

reviews = Reviews(db)

@app.before_request
def authenticate_request(): # Implementamos el sistema de autenticación Bearer simple
    if (request.path == '/' and request.method == 'GET') or request.method == 'OPTIONS':
        return

    headers = request.headers.get('Authorization')

    if headers:
        headers_list = headers.split(' ')
        if isinstance(headers_list, list) and len(headers_list) >= 2 and headers_list[0] == 'Bearer' and headers_list[1] == os.getenv('TOKEN_API'):
            return
        else:
            return jsonify({ 'status': 'error', 'error': 'Forbidden'}), 403
    else:
        return jsonify({ 'status': 'error', 'error': 'Forbidden'}), 403

@app.route('/', methods=['GET']) # Una pequeña bienvenida en la ruta raíz
def index():
    return '''
    <h1>API</h1>
    <p>Te damos la bienvenida a la nuestra API. Este es el único endpoint público</p>
    ''', 200

@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    try:
        return jsonify({'status': 'success', 'data': reviews.get_all()}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'error': f'{e}'}), 500

@app.route('/api/reviews', methods=['POST'])
def post_review():
    try:
        title = request.json.get('title')
        country = request.json.get('country')
        image = request.json.get('image')
        review = request.json.get('review')
        score = request.json.get('score')
        author = request.json.get('author')
        date = datetime.now().date()

        if not title or not country or not image or not review or not isinstance(score, (int, float)) or not author:
            return jsonify({'status': 'error', 'message': 'Missing data'}), 400

        new_review = reviews.insert_one(title, country, image, review, score, author, date)
        return jsonify({'status': 'success', 'message': 'Review added', 'data': new_review}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'error': f'{e}'}), 500

@app.route('/api/reviews/<int:id>', methods=['PATCH'])
def update_review(id):
    try:
        incoming_values = {
            'title': request.json.get('title'),
            'country': request.json.get('country'),
            'image': request.json.get('image'),
            'review': request.json.get('review'),
            'score': request.json.get('score'),
            'author': request.json.get('author'),
        }

        if not incoming_values["title"] and not incoming_values["country"] and not incoming_values["image"] and not incoming_values["review"] and not isinstance(incoming_values["score"], (int, float)) and not incoming_values["author"]: # En caso de que no haya enviado nada
            return jsonify({'status': 'error', 'message': 'Missing data'}), 400

        incoming_values_ = {} # Creo un diccionario con los valores que se van a actualizar

        for indice, (key, value) in enumerate(incoming_values.items()):
            if value is not None:
                incoming_values_[key] = value

        new_review = reviews.update_one(id, incoming_values_)
        return jsonify({'status': 'success', 'message': 'Review updated', 'data': new_review}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'error': f'{e}'}), 500

@app.route('/api/reviews/<int:id>', methods=['DELETE'])
def delete_review(id):
    try:
        reviews.delete_one(id)
        return jsonify({'status': 'success', 'message': 'Review deleted'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'error': f'{e}'}), 500

if __name__ == "__main__":
    debug = bool(os.environ.get('DEBUG')) # Agarra la variable de entorno DEBUG y la fuerza a convertirse en booleano
    app.run(debug = debug) # Inicializa Flask en modo debug o no (suponiendo que ejecutamos el script directamente)
