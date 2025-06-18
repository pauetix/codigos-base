##----Espacio de código para imports----##
import os
from flask import Flask, request

##----Fin del espacio de código para imports----##

##----Código de la aplicación----##

##creamos la instanciad e flask para la aplicación que queremos lanzar
app = Flask(__name__)
port = int(os.environ.get("PORT", 5000))

##código que se ejecuta al recibir peticiones de tipo post a la url
@app.route('/process-video', methods=['POST'])
def process_video():
    if 'video' not in request.files:
        return 'No video uploaded', 400
    file = request.files['video']
    #file.save('uploads/' + file.filename)  # O procesas directamente
    # Aquí podrías usar OpenCV, etc.
    return 'Video recibido en Python', 200

##----Fin de código de aplicación----##

if __name__ == '__main__':
    app.run(port=port)
