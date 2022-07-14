import 'dotenv/config'
import 'colors'
import { inquirerMenu, leerInput, pausa } from './helpers/inquirer.js'
import { Busquedas } from './helpers/models/busquedas.js';


const main = async () => {

    const busquedas = new Busquedas()
    let opt

    do {

        opt = await inquirerMenu()
        
        switch (opt) {
            case 1:
                const lugar = await leerInput('Ingrese la ciudad:')
                const ciudades = await busquedas.ciudad(lugar); 
                break;
        
            default:
                break;
        }


        if( opt !== 3 ) await pausa()

        
    } while (opt !== 3);


}



main()