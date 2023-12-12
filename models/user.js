import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class user extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "user",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        id_account: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "account",
            key: "id",
          },
        },
        nama: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        ttl: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        alamat: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        kota: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        provinsi: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        nomor_telepon: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        tableName: "user",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "id_account",
            using: "BTREE",
            fields: [{ name: "id_account" }],
          },
        ],
      }
    );
  }
}
