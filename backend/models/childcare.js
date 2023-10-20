"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChildCare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Photo,Review}) {
      // define association here
      this.hasMany(Photo, {foreignKey: 'placeId', sourceKey: 'placeId'})
      this.hasMany(Review, {foreignKey: 'placeId', sourceKey: 'placeId'})
    }
    toJSON() {
      return { ...this.get(), id: undefined/*, uuid:undefined, createdAt: undefined, updatedAt: undefined  */};
    }
  }
  ChildCare.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googleMapsLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      placeId: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.FLOAT,
      },
      longitude: {
        type: DataTypes.FLOAT,
      },
      website: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      userRatingsTotal: {
        type: DataTypes.INTEGER,
      }
    },
    {
      sequelize,
      tableName: "child_cares",
      modelName: "ChildCare",
    }
  );
  return ChildCare;
};
