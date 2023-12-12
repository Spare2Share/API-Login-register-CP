import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class donation extends Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "donation",
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
        id_penerima: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
        tableName: "donation",
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
            name: "id_penerima",
            using: "BTREE",
            fields: [{ name: "id_penerima" }],
          },
        ],
      }
    );
  }
}
