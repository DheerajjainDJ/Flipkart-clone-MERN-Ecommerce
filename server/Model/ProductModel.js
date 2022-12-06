import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  id: String,
  url: String,
  detailUrl: String,
  title: Object,
  mrp: Number,
  cost: Number,
  discount: String,
  description: String,
  discounts: String,
  tagline: String,
  reviews: [Object],
});

const Products = mongoose.model("Product", productsSchema);

export default Products;
