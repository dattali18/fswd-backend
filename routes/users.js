import { Router } from "express";

let router = Router();

// Import the user model
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../models/userModel.js";

// Import the auth middleware
import auth from "../utils/authMiddleware.js";

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
router.get("/", async function (req, res) {
  try {
    const rows = await getUsers();
    res.send({
      status: 200,
      message: "Users found",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while getting the users." });
  }
});

/**
 * @desc Get a user by id
 * @route GET /users/:id
 * @access Private
 * @param {string} id - The id of the user
 */
router.get("/:id", async function (req, res) {
  const id = req.params.id;

  try {
    const rows = await getUserById(id);
    res.send({
      status: 200,
      message: `User ${id} found`,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while getting the user." });
  }
});

/**
 * @desc Update a user
 * @route PUT /users/:id
 * @access Private
 * @param {string} id - The id of the user
 */
router.put("/:id", async function (req, res, next) {
  const id = req.params.id;
  const user = req.body;

  // Basic validation to check if the user object contains data
  if (!user || Object.keys(user).length === 0) {
    return res.status(400).send({ message: "User data is required." });
  }

  try {
    const response = await updateUser(id, user);
    res.send({
      status: 200,
      message: `User ${id} updated`,
      data: response,
    });
  } catch (error) {
    // Log the error and return a generic error message
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while updating the user." });
  }
});

/**
 * @desc Delete a user by id
 * @route DELETE /users/:id
 * @access Admin
 * @param {string} id - The id of the user
 */
router.delete("/:id", auth, async function (req, res) {
  const id = req.params.id;

  try {
    const response = await deleteUser(id);
    res.send({
      status: 200,
      message: `User ${id} deleted`,
      data: response,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while deleting the user." });
  }
});

export default router;
