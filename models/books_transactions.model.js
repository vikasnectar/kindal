
module.exports = (sequelize, Sequelize) => {
    const Books_transactions = sequelize.define("books_transactions", {
      from: {
        type: Sequelize.INTEGER(11)
      },
      to: {
        type: Sequelize.INTEGER(11)
      },
      book_qty: {
        type: Sequelize.INTEGER(11)
      },
      book_details: {
        type: Sequelize.TEXT
      },
      received: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: true
      }
    }, {
      timestamps: true
    });
  
    return Books_transactions;
  };