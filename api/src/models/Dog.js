const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    },
    height: {
      type: DataTypes.JSON,
      allowNull: false,
      // validate: {
      //   min: 0, // Validación de valor mínimo (altura no puede ser negativa)
      // },
    },
    weight: {
      type: DataTypes.JSON,
      allowNull: false,
      // validate: {
      //   min: 0, // Validación de valor mínimo (peso no puede ser negativo)
      // },
    },
    lifespan: {
      type: DataTypes.STRING,
      // validate: {
      //   min: 0, // Validación de valor mínimo (años de vida no pueden ser negativos)
      // },
    },
    createdInDb: {
      type : DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },{timestamps:false});
};