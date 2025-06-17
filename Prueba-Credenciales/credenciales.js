/*----Import de las librerías----*/

//importamos la conexión a la base de atos para trabajar con ella
import {pool} from './conexion.js';
//import de express
import express from 'express'
/**
 * importamos cors para poder servirnos de varias direcciones
 * si no lo importamos da error por los orígenes cruzados
 */
import cors from 'cors';


/*----Fin de los imports----*/

/*----Creación de la aplicación----*/
const port = process.env.PORT || 8080;

const app = express();
app.use(cors())

//Manejamos las peticiones HTTP de tipo GET
app.get('/getWorkstation', async (req, res) => {
    //Guardamos el valor del nombre en una variable (opcional, pero más correcto)
    const nombre = req.query.nombre;
    //Guardamos el valor de la variable de workstation obtenida tras la consulta, ha de ser asíncrona porque dependemos de que establezca la conexión
    const workstation = await getWorkstation(nombre);
    //Enviamos el objeto de tipo JSON
    res.json(
        {
            employeeType: workstation
        }
    );
});

//Ponemos a escuchar nuestra aplicación 
app.listen(port, () => {
    console.log("Escuchando en el puerto 3000");
});

//Definimos la función para hacer la consulta a la base de datos
async function getWorkstation(name){
    try{
        //hacemos la consulta a la base de datos definida en la pool de manera asíncrona, porque pool funciona de manera asíncrona
        //el interrogante y el name lo gestiona SQL donde se le asigna el valor de name al interrogante en la consulta
        const [result] = await pool.query('SELECT workstation FROM usuarios WHERE employee_id = ?', [name]);
        // uso del operador --> condicion ? valor si se cumple : valor si no se cumple
        const consulta = result.length > 0 ? result[0].workstation : 'Desconocido';
        //Devolvemos el valor para trabajar con él en el response a la petición GET
        return String(consulta);
    }
    //Manejamos posibles errores
    catch(err){
        console.error(err);
    }
}

/*----Fin del código de la apliación----*/


/** A TENER EN CUENTA
 * 
 * Es importante saber que si trabajamos con funciones asíncronas, 
 * las funciones que dependan de ellas también tendrán que serlo
 * porque devuelven promesas, y si no son asíncronas no nos devolverá el resultado,
 * sino la promesa pendiente --> Promise { <pending> }
 * 
 */