import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class donation_history extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "donation_history",
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
            model: "donation",
            key: "id",
          },
        },
      },
      {
        tableName: "donation_history",
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
}
