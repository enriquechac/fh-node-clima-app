import fs from "fs"

import axios from "axios"

export class Busquedas {

    historial = []
    dbPath = './db/data.json'



    constructor() {
        this.leerDB()
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(" ")
            palabras = palabras.map( palabra => palabra[0].toUpperCase() + palabra.substring(1))
            return palabras.join(" ")
        })
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


    agregarHistorial(lugar = "") {
        //Prevenir duplicados

        if (this.historial.includes(lugar.toLocaleLowerCase())) return;
        
        this.historial = this.historial.splice(0, 5)

        this.historial.unshift(lugar.toLocaleLowerCase());

        //Grabar en DB
        this.guardarDB()
    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) return;        
        const data = fs.readFileSync(this.dbPath, {encoding: "utf-8"})
        const {historial} = JSON.parse(data)
        this.historial = historial;
    }


}