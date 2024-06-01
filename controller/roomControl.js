import { addRoommateQuery, getRoommatesQuery, recalDeudas, } from "../db/roomQuery.js";
import path from 'path'

const __dirname = import.meta.dirname

const home = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
}

// Agregar un nuevo compañero de cuarto a la base de datos.
const addRoommates = async (req, res) => {
    try {
        await addRoommateQuery()
        recalDeudas();
        res.redirect('/')
    } catch (error) {

    }
}

// Obtener todos los compañeros de cuarto de la base de datos.
const getRoommates = async (req, res) => {
    try {
        const roommatesJson = await getRoommatesQuery()
        res.json(roommatesJson) // Envía la lista en formato JSON.

    } catch (error) {
        console.log(error)
    }
};

export { home, addRoommates, getRoommates }