import Products from "../Model/ProductModel.js";

export const productsController = async (request, response) => {
  try {
    const products = await Products.find({});
    if (!products) {
      response.status(401).send("products not found");
    }
    response.send(products);
  } catch (error) {
    console.log("Products error:", error.message);
  }
};

export const getProductById = async (request, response) => {
  try {
    const product = await Products.findOne({ id: request.params.id });
    if (!product) {
      return response.status(401).send("unable to find product");
    }
    response.send(product);
  } catch (error) {
    response.status(501).json("Particular Product Error:", error.message);
  }
};

export const reviewController = async (request, response) => {
  const { id } = request.params;
  try {
    const product = await Products.findOne({ id: id });

    product.reviews.push(request.body);

    const updatedProduct = await Products.findOneAndUpdate(
      { id: id },
      product,
      {
        new: true,
      }
    );

    response.status(200).send(updatedProduct);
  } catch (error) {
    response.status(501).send({ error: error });
  }
};
