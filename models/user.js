import Sequelize from "sequelize";

export default function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    alamat: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    kota: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    provinsi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nomor_telepon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    peran: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    refresh_Token: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
