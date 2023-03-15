const S = require("sequelize");
const db = require("../db");

class Review extends S.Model {}

Review.init(
  {
    star: {
      type: S.FLOAT,
      validate: {
        min: 0,
        max: 5,
      },
    },
    description: {
      type: S.TEXT,
    },
  },
  { sequelize: db, modelName: "review" }
);

Review.addHook("beforeValidate", (review, options) => {
    if (!review.star && !review.description) {
        throw new Error("Either Star or Description must be filled!");
      }
});

module.exports = Review;
