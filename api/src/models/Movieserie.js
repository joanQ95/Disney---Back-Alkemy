const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('movieserie', {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    creationAge:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    rated:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    timestamps: false,
  });
};
