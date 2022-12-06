import { products } from "./constants/Products.js";
import Products from "./Model/ProductModel.js";

const defaultData = async () => {
  try {
    await Products.insertMany(products);
    console.log("products data successfully added in the database");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export default defaultData;
