/*----Import de las librerías----*/

//importamos promise porque lo que queremos es manejar los tiempos de espera
import {createPool} from 'mysql2/promise';

/*----Fin de los imports----*/

/*----Creación de la conexión----*/

/**
 * Creamos una pool para generar conexiones que se reutilizan a nuestra base de datoa.
 * 
 * De esta manera es más eficiente, ya que no hacemos creamos y destruimos conexiones.
 * 
 * Y la exportamos para poder usarla en otro código
 */
export const pool = createPool({
    database:"credential-test",
    user:'test',
    password: 'test',
    socketPath: `/cloudsql/dev-zephyr-462508-h4:europe-west1:paint-test`, //para que se conecte 
    connectTimeout: 10000 // espera para que se establezca la conexión
});

/*----Fin del código de conexión----*/