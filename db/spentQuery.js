import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const getSpentQuery = async () => {
  const gastosJson = JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
  return gastosJson;
};

const addSpentQuery = async (gasto) => {
  try {
    gasto.fecha = new Date();
    gasto.id = uuidv4().slice(0, 8);
    const gastosJson = JSON.parse(
      fs.readFileSync("./data/gastos.json", "utf-8")
    );
    gastosJson.gastos.push(gasto);
    fs.writeFileSync("./data/gastos.json", JSON.stringify(gastosJson));
  } catch (error) {
    console.log(error);
  }
};

const editSpentQuery = async (id, gasto) => {
  try {
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
    await fs.writeFileSync("data/gastos.json", JSON.stringify({ gastos }));
  } catch (error) {}
};

// DELETE
const deleteSpentQuery = async (id) => {
  try {
    const gastosJSON = await fs.readFileSync("data/gastos.json", "utf8");
    console.log(gastosJSON);
    let { gastos } = JSON.parse(gastosJSON);
    gastos = gastos.filter((g) => g.id !== id);
    await fs.writeFileSync("data/gastos.json", JSON.stringify({ gastos }));
  } catch (error) {}
};

export { getSpentQuery, addSpentQuery, editSpentQuery, deleteSpentQuery };