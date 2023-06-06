const axios = require("axios")
const {getAllTemperaments} = require("../controllers/getAllTemp")

const getTemperamentsHandler = async (req, res) => {
    const temperaments = await getAllTemperaments();
    try {
        res.status(200).json(temperaments)
    } catch (error) {
       res.status(404).json(error.message) 
    }
}

module.exports = getTemperamentsHandler