import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class recipient_history extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "recipient_history",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        id_user: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "user",
            key: "id",
          },
        },
        id_organization: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "organization",
            key: "id",
          },
        },
        id_permintaan: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "donation_request",
            key: "id",
          },
        },
      },
      {
        tableName: "recipient_history",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "id_permintaan",
            using: "BTREE",
            fields: [{ name: "id_permintaan" }],
          },
          {
            name: "id_user",
            using: "BTREE",
            fields: [{ name: "id_user" }],
          },
          {
            name: "id_organization",
            using: "BTREE",
            fields: [{ name: "id_organization" }],
          },
        ],
      }
    );
  }
}
