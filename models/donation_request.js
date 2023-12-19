import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class donation_request extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "donation_request",
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
        tanggal: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        deskripsi: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        jenis_makanan: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        jumlah_makanan: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        tableName: "donation_request",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "id_organization",
            using: "BTREE",
            fields: [{ name: "id_organization" }],
          },
          {
            name: "id_user",
            using: "BTREE",
            fields: [{ name: "id_user" }],
          },
        ],
      }
    );
  }
}
