import users from "../Model/UserModel.js";
import validEmail from "../utils/validateEmail.js";
import bcrypt from "bcryptjs";

export const signUpController = async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  try {
    if (!firstname) {
      return res.status(404).send({ error: "firstname is required" });
    }
    if (!lastname) {
      return res.status(404).send({ error: "lastname is required" });
    }
    if (!email) {
      return res.status(404).send({ error: "email is required" });
    }
    if (!validEmail(email)) {
      return res.status(404).send({ error: "invalid Email address" });
    }
    if (!password) {
      return res.status(404).send({ error: "password is required" });
    }
    if (password.length < 8) {
      return res
        .status(404)
        .send({ error: "password must contain atleast 8 characters" });
    }
    if (password !== confirmPassword) {
      return res.status(404).send({ error: "passwords don't match" });
    }

    const newUser = await users.create({
      name: `${firstname} ${lastname}`,
      email: email,
      password: password,
    });

    const token = await newUser.generateToken();

    await newUser.save();
    res.status(201).send({ newUser, token });
  } catch (error) {
    res.status(501).send({ error: error });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const verifiedUser = await users.findOne({ email: email });

    if (!verifiedUser) {
      return res.status(404).send({ error: "user not found" });
    }

    const isPasswordVerified = await bcrypt.compare(
      password,
      verifiedUser.password
    );

    if (!isPasswordVerified) {
      return res.status(404).send({ error: "invalid email or password" });
    }

    const token = await verifiedUser.generateToken();

    res.status(200).send({ verifiedUser, token });
  } catch (error) {
    res.status(501).send({ error: error });
  }
};

export const logoutController = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send("successfully logged out")
  } catch (error) {
    res.status(501).send({ error: error });
  }
};
