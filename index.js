import 'dotenv/config'
import 'colors'
import { inquirerMenu, leerInput, listadoLugares, pausa } from './helpers/inquirer.js'
import { Busquedas } from './helpers/models/busquedas.js';


const main = async () => {

    const busquedas = new Busquedas()
    let opt

    do {

        opt = await inquirerMenu()
        
        switch (opt) {
            case 1:
                const lugarInput = await leerInput('Ingrese la ciudad:')
                const lugares = await busquedas.ciudad(lugarInput); 
                const id = await listadoLugares(lugares)
                const lugarSeleccionado = lugares.find( l => l.id === id)

                console.log(`${'\nInformación de la ciudad:\n'.green}`)
                console.log(`Lugar: ${(lugarSeleccionado.name + '').cyan }`)
                console.log(`Lat: ${(lugarSeleccionado.lat + '').cyan }`)
                console.log(`Lng: ${(lugarSeleccionado.lng + '').cyan }`)
                break;
        
            default:
                break;
        }


        if( opt !== 3 ) await pausa()

        
    } while (opt !== 3);


}



main()