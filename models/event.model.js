module.exports = (sequelize, Sequelize) => {
    const event = sequelize.define("event", {
        name: {
        type: Sequelize.STRING
      },
      name_en: {
        type: Sequelize.STRING
      },
      userId :{
        type: Sequelize.INTEGER(11)
      },
      date:{
          type:Sequelize.DATE(6)
      },
      time:{
          type:Sequelize.STRING
      },
      image:{
          type:Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      description_en: {
        type: Sequelize.TEXT
      },
      approved: {
        type: Sequelize.BOOLEAN,
        default:false
      },
      status: {
        type: Sequelize.BOOLEAN,
        default:false
      }
    },{
        timestamps:true
    });
  
    return event;
  };