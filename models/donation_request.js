import Sequelize from "sequelize";

export default function(sequelize, DataTypes) {
  return sequelize.define('donation_request', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_organisasi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organization',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'donation_request',
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
      {
        name: "id_organisasi",
        using: "BTREE",
        fields: [
          { name: "id_organisasi" },
        ]
      },
    ]
  });
};
