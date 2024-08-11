import { Router } from "express";

import bcryptjs_pkg from "bcryptjs";
const { hash, compare } = bcryptjs_pkg;

import jsonwebtoken_pgk from "jsonwebtoken";
const { sign } = jsonwebtoken_pgk;

const router = Router();
// import auth from "../utils/authMiddleware.js";

import { getUserByEmail, createUser } from "../models/userModel.js";

// require("dotenv").config();

import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @param email
 * @param password
 * @returns {string} - User created
 */
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  // the rest of the data will be added later
  const hashedPassword = await hash(password, 10);

  const newUser = {
    user_name: "",
    first_name: "",
    last_name: "",
    email: email,
    password: hashedPassword,
    is_writer: false,
  };

  try {
    await createUser(newUser);
    return res.status(201).send("User created");
  } catch (err) {
    return res.status(500).send("Error creating user");
  }
});

/** 
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 * @param email
 * @param password
 * @returns {string} - Token and user information
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // if the email or password is missing, return a 400 status
  if (!email || !password) {
    return res.status(400).send("Both email and password are required");
  }

  try {
    const [user] = await getUserByEmail(email);

    if (!user) {
      return res.status(404).send("Invalid email or password");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }

    const token = sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({
      token,
      user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        is_writer: user.is_writer,
      },
    });
  } catch (err) {
    res.status(500).send("Error logging in");
  }
});

export default router;
