'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ChildCare}) {
      // define association here
      this.belongsTo(ChildCare, {foreignKey: 'placeId'})
    }

    // toJSON() {
    //   return { ...this.get(), id: undefined };
    // }

  }
  Photo.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    placeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    width: {
      type: DataTypes.INTEGER,
    },
    photoReference: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.BLOB,
    }

  }, {
    sequelize,
    tableName: "photos",
    modelName: 'Photo',
  });
  return Photo;
};