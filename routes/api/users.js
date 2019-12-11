const express = require("express");
const router = express.Router();
const uuid = require("uuid");

// Get users JSON
const users = require("../../fixures/users");

// Get all users
router.get("/", (req, res) => res.json(users));

// Get single user
router.get("/:id", (req, res) => {
  const userIsFound = users.some(user => user.id === parseInt(req.params.id));

  if (userIsFound) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No users found with id: ${req.params.id}` });
  }
});

// Create user
router.post("/", (req, res) => {
  const {
    body: { name, age }
  } = req;
  const newUser = {
    id: uuid.v4(),
    name,
    age
  };
  // res.send(req.body);
  if (!name || !age) {
    return res.status(400).json({ msg: "Please include name and age" });
  }
  users.push(newUser);
  res.json(users);
});

// Update user
router.put("/:id", (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));

  if (found) {
    const updUser = req.body;
    users.forEach(user => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updUser.name ? updUser.name : user.name;
        user.age = updUser.age ? updUser.age : user.age;

        res.json({ msg: "User updated", user });
      }
    });
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

// Delete user
router.delete("/:id", (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "User deleted",
      users: users.filter(user => user.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

module.exports = router;
