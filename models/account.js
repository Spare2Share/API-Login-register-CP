import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class account extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "account",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: "email",
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        refresh_token: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        tableName: "account",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "email",
            unique: true,
            using: "BTREE",
            fields: [{ name: "email" }],
          },
        ],
      }
    );
  }
}
