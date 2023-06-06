const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Temperament } = require("../db.js");

const getAllTemperaments = async (req, res) => {
  let findTemp = await Temperament.findAll();

  if (findTemp.length === 0) {
    const temperamentsApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?key=${API_KEY}`
    );

    // Extraer los temperamentos de los datos de la API
    const temperaments = temperamentsApi.data.map((e) => e.temperament);

    // Convertir la cadena de temperamentos en un array separado por comas
    const temps = temperaments.toString().split(",");

    // Crear o encontrar cada temperamento en la base de datos
    await Promise.all(
      temps.map(async (el) => {
        let i = el.trim();
        await Temperament.findOrCreate({
          where: { name: i },
        });
      })
    );

    findTemp = await Temperament.findAll();
  }

  return findTemp;
};

module.exports = {
  getAllTemperaments,
};