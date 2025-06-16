/*----IMPORT DE LAS LIBRERÍAS----*/

const multer = require('multer');
const express = require('express');

/*----FIN DE IMPORTS----*/

/*----CÓDIGO DE APLIACIÓN----*/

const app = express();
const upload = multer.diskStorage({
    filename: function (req, file, cb) {
        
    },
    destination: function (req, file, cb){
        
    }
})