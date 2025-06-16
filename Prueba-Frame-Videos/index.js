                //importamos las librerías

const fs = require('node:fs')
    //express
const express = require('express')
    //multer
const multer = require('multer')

                //fin de espacio para las librerías

            
                //código

    //puerto con el que vamos a trajar
const port = 3000;

    //llamamos a multer para crear un middleware y especificamos ruta donde dejaremos los archivos con los que vamos a trabajar
const upload = multer({dest: 'uploads/'});

    //creamos la aplicación de express
const app = express();

            //Funciones para cuando se recibe una petición post

    //establecemos cómo va a actuar la aplicación cuando se le haga un método HTTP POST y se trate de una sola imagen
app.post('/images/single', upload.single('avatar'), (req, res) => {
        //obtenemos los datos de la imagen
    guardadImagen(req.file)
        //responde a la petición con un mensaje
    res.send('Se ha enviado la imagen');
})

app.post('/images/mult', upload.array("frames", 15), (req, res) => {
        //Guardamos las imágenes con su nombre utilizando el método que hemos creado
    req.files.map(guardadImagen)
        //Respondemos a la petición con un mensaje
    res.send('Se ha enviado la imagen');
})

            //Fin de las funciones

    //Aquí vamos a hacer que se guarde la imagen
function guardadImagen(file){
        //imprimimos los valores por la consola
    console.log(file);
        //creamos un nuevo path con el nombre de la imagen
    const newPath = `./uploads/${file.originalname}`
        //le cambiamos el nombre a la imagen para poder abrir las fotos
    fs.renameSync(file.path, newPath)
        //devolvemos el nuevo path
    return newPath
}

    //Ponemos a escuchar nuestra aplicación por el puerto deseado
app.listen(port, () => {
    console.log("Escuchando en el puerto " + String(port));
});

            //fin del código