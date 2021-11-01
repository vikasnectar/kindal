module.exports = (sequelize, Sequelize) => {
    const Blog_category = sequelize.define("blog_category", {
        title: {
        type: Sequelize.STRING
      },  title_en: {
        type: Sequelize.STRING
      },category_id :{
        type: sequelize.NUMBER(11)
      },
      url:{
        type:sequelize.STRING
      },
      date:{
          type:sequelize.DATE(6)
      },
      time:{
          type:sequelize.STRING
      },
      image:{
          type:sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      description_en: {
        type: Sequelize.TEXT
      },approved: {
        type: Sequelize.BOOLEAN,
        default:false
      },status: {
        type: Sequelize.BOOLEAN,
        default:false
      }
    },{
        timestamps:true
    });
  
    return Blog_category;
  };