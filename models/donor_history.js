import Sequelize from "sequelize";

export default function (sequelize, DataTypes) {
  return sequelize.define(
    "donor_history",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_donatur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      id_donasi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "food_donation",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "donor_history",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "id_donatur",
          using: "BTREE",
          fields: [{ name: "id_donatur" }],
        },
        {
          name: "id_donasi",
          using: "BTREE",
          fields: [{ name: "id_donasi" }],
        },
      ],
    }
  );
}
