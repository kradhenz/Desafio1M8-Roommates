import { getSpentQuery, addSpentQuery, editSpentQuery, deleteSpentQuery } from "../db/spentQuery.js";
import { recalDeudas } from "../db/roomQuery.js";

// Recibe un nuevo gasto a través de req.body.
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

// Llama a getSpentQuery para obtener todos los gastos de la base de datos.
const getGastos = async (req, res) => {
    try {
        const gastosJson = await getSpentQuery()
        res.json(gastosJson)
    } catch (error) {
        console.log(error)
    }
}

// Obtiene el ID del gasto a editar desde req.query.id.
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

// Obtiene el ID del gasto a eliminar desde req.query.id.
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