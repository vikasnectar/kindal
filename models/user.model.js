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
      defaultValue: 5 // 1 for superadmin , 2 for admin, 3 for consignee , 4 for auther , 5 for client (customer)
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
    profile_img: {
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