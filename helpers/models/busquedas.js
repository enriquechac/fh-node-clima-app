
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
            
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                name: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }))


        } catch (error) {
            
            return []

        }

    }


    async climaLugar(lat = 0, lon = 0) {
        

        try {
            
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    appid: process.env.OPENWEATHER_KEY,
                    units: 'metric',
                    lang: 'es',
                    lat,
                    lon
                }
            })

            const {data } = await instance.get()
            const { weather, main } = data

            return {
                weather,
                main
            }


        } catch (error) {
            
            console.log(error);

        }

    }


}