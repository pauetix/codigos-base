/*----IMPORT DE LAS LIBRERÍAS----*/

const multer = require('multer');
const express = require('express');
const fs = require('node:fs');
const path = require('path');


/*----FIN DE IMPORTS----*/

/*----CÓDIGO DE APLIACIÓN----*/

const numFRAME = 0;
const app = express();

/*----ESPACIO PARA DEFINIR LAS RUTAS PARA VíDEOS Y PARA FRAMES----*/

//Aquí definimos que el destino al que van los vídeos que recibe el programa
const storage = multer.diskStorage({
    //nombre que tendrá el archivo cuando lo guardemos
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
    //destino en el que guardaremos el vídeo
    destination: function (req, file, cb){
        //Establecemos la ruta a la que van los videos cuando se reciben
        cb(null, path.join('C:', 'Users', 'TSE', 'Desktop', 'PRUEBAS-FRAMES-VIDEOS', 'VIDEOS'))
    }
});

//Definimos el filtro para que se le aplique a los vídeos que llegan al endpoint
const filter = function (req, file, cb) {
    //Mimetype devuelve el tipo MIME (ejemplo: 'video/mp4', 'image/jpeg', etc.)
    //En caso de ser vídeo lo acepta.
    if (file.mimetype && file.mimetype.startsWith('video/')) {
        cb(null, true); // Acepta el archivo
    } 
    //En caso de no tratarse de un vídeo, lo rechazamos.
    else {
        cb(new Error('Solo se permiten archivos de vídeo.'), false); // Rechaza
    }
};

const videos = multer({storage: storage, fileFilter: filter});

/*----FIN DE ESPACIO PARA DEFINICIÓN DE RUTAS PARA VÍDEOS Y FRAMES----*/

//manejamos las peticiones de tipo post que llegan al backend
app.post('/sendVideo', videos.single('videoProc'),  (req, res) => {
    //caso en el que no nos llega nada se lanza un error y se envía mensaje
    if(!req.file)
        return res.status(400).send("No se ha subido ningún archivo");
    //en el caso en el que sí qie se recine archivo se envía que se ha recibido correctamente
    else res.send("Se ha enviado el vídeo correctamente");
});

/*----FIN DE CÓDIGO DE APLIACIÓN----*/

//ponemos a escuchar la aplicación en el puerto 3000
app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000");
})
