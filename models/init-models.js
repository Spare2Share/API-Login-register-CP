import {DataTypes} from "sequelize";

import donation_request from "./donation_request.js";
import donor_history from "./donor_history.js";
import food_donation from "./food_donation.js";
import organization from "./organization.js";
import recipient_history from "./recipient_history.js";
import user from "./user.js";

function initModels(sequelize) {
  var _donation_request = donation_request(sequelize, DataTypes);
  var _donor_history = donor_history(sequelize, DataTypes);
  var _food_donation = food_donation(sequelize, DataTypes);
  var _organization = organization(sequelize, DataTypes);
  var _recipient_history = recipient_history(sequelize, DataTypes);
  var _user = user(sequelize, DataTypes);

  _recipient_history.belongsTo(_donation_request, { as: "id_permintaan_donation_request", foreignKey: "id_permintaan"});
  _donation_request.hasMany(_recipient_history, { as: "recipient_histories", foreignKey: "id_permintaan"});
  _donor_history.belongsTo(_food_donation, { as: "id_donasi_food_donation", foreignKey: "id_donasi"});
  _food_donation.hasMany(_donor_history, { as: "donor_histories", foreignKey: "id_donasi"});
  _donation_request.belongsTo(_organization, { as: "id_organisasi_organization", foreignKey: "id_organisasi"});
  _organization.hasMany(_donation_request, { as: "donation_requests", foreignKey: "id_organisasi"});
  _food_donation.belongsTo(_organization, { as: "id_organisasi_organization", foreignKey: "id_organisasi"});
  _organization.hasMany(_food_donation, { as: "food_donations", foreignKey: "id_organisasi"});
  _recipient_history.belongsTo(_organization, { as: "id_penerima_organization", foreignKey: "id_penerima"});
  _organization.hasMany(_recipient_history, { as: "recipient_histories", foreignKey: "id_penerima"});
  _donor_history.belongsTo(_user, { as: "id_donatur_user", foreignKey: "id_donatur"});
  _user.hasMany(_donor_history, { as: "donor_histories", foreignKey: "id_donatur"});

  return {
    _donation_request,
    _donor_history,
    _food_donation,
    _organization,
    _recipient_history,
    _user,
  };
}

export default initModels;
