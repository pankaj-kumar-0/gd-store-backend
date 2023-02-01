const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the product name."],
    maxLength: [200, "The Product name length is too big."],
    minLength: [8, "The Product name length should be more than 8 character."],
    trim: true,
    unique : [true, "The product name is already exist"]
  },
  detail: {
    type: String,
    required: [true, "Please Enter the product name."],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the product price."],
    max: [10000000, "The price can not go upto one crore"],
  },
  category: {
    type: String,
    required: [true, "Please Enter the product Category"],
  },

  images: [
    {
      image_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  Stock: {
    type: Number,
    required: [true, "Please enter product stock value"],
    max: [10000, "Stock cannot go upto 10000"],
    default: 1,
  },

  ratings: {
    type: Number,
    default: 0,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        required : true
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      ratingDate:{
        type:Date,
        default: Date.now,
      }
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Users',
    required : true
  }
});

module.exports = mongoose.model('Products', product_schema);
