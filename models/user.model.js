module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    user_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    gendar: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.INTEGER(11),
      defaultValue: 2 // 1 for admin , 2 for user, 3 for consignee
    },
    phone: {
      type: Sequelize.INTEGER(11)
    },
    dob_date: {
      type: Sequelize.DATE(6)
    },
    verification_token: {
      type: Sequelize.STRING
    },
    resetPasswordExpires: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false, 
      defaultValue: false
    }
  }, {
    timestamps: true
  });

  return Users;
};