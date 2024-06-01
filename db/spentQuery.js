import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// CREATE: Agrega un nuevo gasto al archivo gastos.json.
const addSpentQuery = async (gasto) => {
  try {
    // Añade una fecha actual y un ID único al gasto.
    gasto.fecha = new Date();
    gasto.id = uuidv4().slice(0, 8);
    const gastosJson = JSON.parse(
      fs.readFileSync("./data/gastos.json", "utf-8")
    );
    // Actualiza el archivo gastos.json con el nuevo gasto.
    gastosJson.gastos.push(gasto);
    fs.writeFileSync("./data/gastos.json", JSON.stringify(gastosJson));
  } catch (error) {
    console.log(error.message);
  }
};

// READ: Lee y devuelve la lista de gastos desde el archivo gastos.json.
const getSpentQuery = async () => {
  const gastosJson = JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
  return gastosJson;
};

// EDIT: Edita un gasto existente en el archivo gastos.json by ID.
const editSpentQuery = async (id, gasto) => {
  try {
    // Sustituye los datos del gasto con los nuevos datos proporcionados, manteniendo el mismo ID.
    const gastosJSON = await fs.readFileSync("data/gastos.json", "utf8");
    let { gastos } = JSON.parse(gastosJSON);
    gastos = gastos.map((g) => {
      if (g.id == id) {
        const newData = gasto;
        newData.id = id;
        return newData;
      }
      return g;
    });
    // Actualiza el archivo gastos.json con la lista de gastos modificada.
    await fs.writeFileSync("data/gastos.json", JSON.stringify({ gastos }));
  } catch (error) {
    console.log(error.message);
  }
};

// DELETE: Elimina un gasto del archivo gastos.json by ID.
const deleteSpentQuery = async (id) => {
  try {
    // Filtra la lista de gastos para eliminar el gasto correspondiente.
    const gastosJSON = await fs.readFileSync("data/gastos.json", "utf8");
    console.log(gastosJSON);
    let { gastos } = JSON.parse(gastosJSON);
    gastos = gastos.filter((g) => g.id !== id);
    // Actualiza el archivo gastos.json para reflejar la eliminación del gasto.
    await fs.writeFileSync("data/gastos.json", JSON.stringify({ gastos }));
  } catch (error) {
    console.log(error.message);
  }
};

export { getSpentQuery, addSpentQuery, editSpentQuery, deleteSpentQuery };