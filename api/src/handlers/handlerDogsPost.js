const axios = require("axios")
const {Dog, Temperament} = require("../db")


const postDogsHandler = async (req, res) => {
  const {
    name,
    image,
    height,
    weight,
    lifespan,
    temperaments  
  } = req.body;

  try {
    const dogCreated = await Dog.create({
      name,
      image,
      height,
      weight,
      lifespan,
      temperaments: await Temperament.findAll({
        where: { name: temperaments }
      })
    });
    res.status(201).json({ message: "Dog creado con éxito", dog: dogCreated })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
  
  module.exports = { postDogsHandler };