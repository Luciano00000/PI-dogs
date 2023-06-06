const {getAllDogs} = require("../controllers/getAllDogs")
const {getDogByID} = require("../controllers/getDogById")

const getDogsHandler = async (req, res) => {
    try {
        const name = req.query.name
        let dogsTotal = await getAllDogs();
    if(name){
        let dogName = await dogsTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send("No se encuentra la raza");
    } else{
        res.status(200).send(dogsTotal);
    }
    } catch (error) {
        res.status(500).json(error.message);
    }
  };
  
  const getDog = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const dog = await getDogByID(id, source)
        res.status(200).json(dog)  
    } catch (error) {
        res.status(400).json(error.message);
    }
  };
  // const getDogByName = async (req,res) =>

  
  module.exports = { getDogsHandler, getDog};