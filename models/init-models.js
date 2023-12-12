import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _account from "./account.js";
import _donation from "./donation.js";
import _donation_history from "./donation_history.js";
import _donation_request from "./donation_request.js";
import _organization from "./organization.js";
import _recipient_history from "./recipient_history.js";
import _user from "./user.js";

export default function initModels(sequelize) {
  const account = _account.init(sequelize, DataTypes);
  const donation = _donation.init(sequelize, DataTypes);
  const donation_history = _donation_history.init(sequelize, DataTypes);
  const donation_request = _donation_request.init(sequelize, DataTypes);
  const organization = _organization.init(sequelize, DataTypes);
  const recipient_history = _recipient_history.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  organization.belongsTo(account, {
    as: "account",
    foreignKey: "id_account",
  });
  account.hasMany(organization, {
    as: "organizations",
    foreignKey: "id_account",
  });
  user.belongsTo(account, {
    as: "account",
    foreignKey: "id_account",
  });
  account.hasMany(user, { as: "users", foreignKey: "id_account" });
  donation_history.belongsTo(donation, {
    as: "donation",
    foreignKey: "id_donasi",
  });
  donation.hasMany(donation_history, {
    as: "donation_histories",
    foreignKey: "id_donasi",
  });
  recipient_history.belongsTo(donation_request, {
    as: "donation_request",
    foreignKey: "id_permintaan",
  });
  donation_request.hasMany(recipient_history, {
    as: "recipient_histories",
    foreignKey: "id_permintaan",
  });
  donation.belongsTo(organization, {
    as: "organization",
    foreignKey: "id_penerima",
  });
  organization.hasMany(donation, {
    as: "donations",
    foreignKey: "id_penerima",
  });
  donation_request.belongsTo(organization, {
    as: "organization",
    foreignKey: "id_pemohon",
  });
  organization.hasMany(donation_request, {
    as: "donation_requests",
    foreignKey: "id_pemohon",
  });
  recipient_history.belongsTo(organization, {
    as: "organization",
    foreignKey: "id_penerima",
  });
  organization.hasMany(recipient_history, {
    as: "recipient_histories",
    foreignKey: "id_penerima",
  });
  donation.belongsTo(user, { as: "user", foreignKey: "id_donatur" });
  user.hasMany(donation, { as: "donations", foreignKey: "id_donatur" });
  donation_history.belongsTo(user, {
    as: "user",
    foreignKey: "id_donatur",
  });
  user.hasMany(donation_history, {
    as: "donation_histories",
    foreignKey: "id_donatur",
  });
  user.hasMany(recipient_history, {
    as: "recipient_histories",
    foreignKey: "id_penerima",
  });

  return {
    account,
    donation,
    donation_history,
    donation_request,
    organization,
    recipient_history,
    user,
  };
}
