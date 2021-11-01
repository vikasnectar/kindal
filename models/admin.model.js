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
        type: Sequelize.STRING
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
      phone: {
        type: Sequelize.INTEGER(11)
      },
      dob_date: {
        type: Sequelize.DATE(6)
      },status: {
        type: Sequelize.BOOLEAN,
        default:false
      }
    },{
        timestamps:true
    });
  
    return Users;
  };