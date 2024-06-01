import { getSpentQuery, addSpentQuery, editSpentQuery, deleteSpentQuery } from "../db/spentQuery.js";
import { recalDeudas } from "../db/roomQuery.js";


const getGastos = async (req, res) => {
    try {
        const gastosJson = await getSpentQuery()
        res.json(gastosJson)
    } catch (error) {
        console.log(error)
    }
}

const addGasto = async (req, res) => {
    try {
        const gasto = req.body
        await addSpentQuery(gasto)
        recalDeudas();
        res.send("Gasto agregado")
    } catch (error) {
        console.log(error)
    }
}

const editGasto = async (req, res) => {
    try {
        const id = req.query.id
        const gasto = req.body
        await recalDeudas();
        await editSpentQuery(id, gasto)
        
        res.send("Gasto editado")
    } catch (error) {
        console.log(error)
    }
}

const deleteGasto = async (req, res) => {
    try {
        const id = req.query.id
        
        await deleteSpentQuery(id) // delete by id calling function
        recalDeudas()
        res.send("Gasto eliminado")
    } catch (error) {
        console.log(error)
    }
}

export { getGastos, addGasto, editGasto, deleteGasto }