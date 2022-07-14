
import axios from "axios"

export class Busquedas {

    historial = []

    constructor() {
        
    }

    async ciudad(lugar = '') {
        

        try {
            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: {
                    access_token: process.env.MAPBOX_KEY,
                    limit: 5,
                    language: 'es',
                }
            })

            const resp = await instance.get()
            console.log(resp.data)

        } catch (error) {
            
        }

        console.log('ciudad', lugar);

        return []
    }


}