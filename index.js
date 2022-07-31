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
                const lugares = await busquedas.ciudad(lugarInput)
                const id = await listadoLugares(lugares)
                const {name, lat, lng} = lugares.find(l => l.id === id)
                const {main, weather} = await busquedas.climaLugar(lat, lng) 

                console.clear()
                console.log(`${'\nInformación de la ciudad:\n'.green}`)
                console.log(`Lugar: ${(name + '').cyan }`)
                console.log(`Lat: ${(lat + '').cyan }`)
                console.log(`Lng: ${(lng + '').cyan }`)
                console.log(`Temperatura: ${( main.temp + '°C').cyan }`)
                console.log(`Máxima: ${(main.temp_max + '°C').cyan }`)
                console.log(`Mínima: ${(main.temp_min + '°C').cyan }`)
                console.log(`Descripción: ${(weather[0]?.description + '').cyan }`)
                break;
        
            default:
                break;
        }


        if( opt !== 3 ) await pausa()

        
    } while (opt !== 3);


}



main()