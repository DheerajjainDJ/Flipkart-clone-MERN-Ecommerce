import express from "express";
import {
  signUpController,
  loginController,
  logoutController,
} from "../controllers/userController.js";
import {
  productsController,
  getProductById,
  reviewController,
} from "../controllers/productsController.js";
import auth from "../middleware/auth.js";
import {
  paytmGateway,
  paytmCallback,
} from "../controllers/paytmControllers.js";

const router = express.Router();

router.post("/signUp", signUpController);
router.post("/login", loginController);
router.post("/logout", auth, logoutController);

router.get("/products", productsController);
router.get("/product/:id", getProductById);
router.post("/product/:id/review", auth, reviewController);

router.post("/payment", paytmGateway);
router.post("/callback", paytmCallback);

export default router;
