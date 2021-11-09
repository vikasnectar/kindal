module.exports = (sequelize, Sequelize) => {
    const Book_category = sequelize.define("book_category", {
      name: {
        type: Sequelize.STRING
      },
      name_en: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      description_en: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: false
      }
    },
      {
        timestamps: true
      });
  
    return Book_category;
  };