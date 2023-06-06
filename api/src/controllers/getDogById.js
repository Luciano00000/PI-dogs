const axios = require("axios")
const { API_KEY } = process.env
const {Dog, Temperament} = require("../db")


const getDogByID = async (id, source) => {

    if (source === "api") {
       const dog = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?key=${API_KEY}`)).data;
       return dog
      //console.log(dog);
    } else {
       const dog = await Dog.findByPk(id, {
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
        return dog
    }
  
    //return dog;
  };

module.exports = {getDogByID}