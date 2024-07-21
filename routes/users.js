const express = require("express");
const { auth } = require("./auth");

const { allUsers } = require("../models/userModel.js");

let router = express.Router();

let { updateUser, getUserById } = require("../models/userModel.js");

/* GET users listing. */
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

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;

  console.log(`Getting user ${id}`);

  const rows = await getUserById(id);

  // if the user was not found
  if (rows.length === 0) {
    res.send({
      status: 404,
      message: `User ${id} not found`,
    });
  } else {
    res.send({
      status: 200,
      message: `User ${id} found`,
      data: rows,
    });
  }
});

module.exports = router;
