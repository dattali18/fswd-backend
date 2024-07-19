const express = require('express');
const { auth } = require("./auth");

let router = express.Router();

let { updateUser, getUserById } = require('../models/user.js');

router.get("/", async function(req, res, next) {

    res.send(
        {
            status: 200,
            message: "Users found",
            data: [
                {
                    id: 1,
                }]
        }
    )
});

/* POST : adding more info to user */
router.put('/:id', async function(req, res, next) {
  // get the id from the URL
    const id = req.params.id;

    // get the user data from the request
    const user = req.body;
    // call the model function with the id and user data

    const response = await updateUser(id, user);


    res.send(
        {
            status: 200,
            message: `User ${id} updated`,
        }
    );
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;

    console.log(`Getting user ${id}`);

  const rows = await getUserById(id);

  // if the user was not found
    if (rows.length === 0) {
        res.send(
            {
                status: 404,
                message: `User ${id} not found`,
            }
        );
    } else {
        res.send(
            {
                status: 200,
                message: `User ${id} found`,
                data: rows,
            }
        );
    }
});

module.exports = router;
