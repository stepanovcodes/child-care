"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ChildCare}) {
      // define association here
      this.belongsTo(ChildCare, {foreignKey: 'placeId', targetKey: 'placeId'})
    }

    toJSON() {
      return { ...this.get(), id: undefined/*, uuid:undefined, createdAt: undefined, updatedAt: undefined */ };
    }
  }
  Review.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      placeId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authorName: {
        type: DataTypes.STRING,
      },
      profilePhotoUrl: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      relativeTimeDescription: {
        type: DataTypes.STRING,
      },
      text: {
        type: DataTypes.TEXT,
      },
      time: {
        type: DataTypes.INTEGER,
      },
      translated: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      tableName: "reviews",
      modelName: "Review",
    }
  );
  return Review;
};
