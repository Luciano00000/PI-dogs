const axios = require("axios");
const { API_KEY } = process.env
const {Dog, Temperament} = require("../db")

const getApiInfo= async () => {
  const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds/?key=${API_KEY}`);
  const apiInfo = await apiUrl.data.map(el => {
      return {
          id: el.id,
          name: el.name,
          image: el.image,
          height: el.height,
          weight: el.weight,
          life_span: el.life_span,
          temperament:el.temperament,
      };
  });
  return apiInfo
};


const getDbInfo = async () => {
  let dogDB = await Dog.findAll({
      include:{
          model: Temperament,
          attributes: ["name"],
          through: {
              attributes:[],
          }
      }
  })

return dogDB
}


//dogs de DB + API

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const DbInfo = await getDbInfo();
  const infoTotal = await DbInfo.concat(apiInfo);
  return infoTotal;
};

module.exports = {getAllDogs};