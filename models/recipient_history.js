import Sequelize from "sequelize";

export default function(sequelize, DataTypes) {
  return sequelize.define('recipient_history', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_penerima: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organization',
        key: 'id'
      }
    },
    id_permintaan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'donation_request',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'recipient_history',
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
        name: "id_penerima",
        using: "BTREE",
        fields: [
          { name: "id_penerima" },
        ]
      },
      {
        name: "id_permintaan",
        using: "BTREE",
        fields: [
          { name: "id_permintaan" },
        ]
      },
    ]
  });
};
