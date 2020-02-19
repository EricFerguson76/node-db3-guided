const express = require("express");

const Users = require("./user-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Users.all()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
    });
});

router.post("/", (req, res) => {
  const userData = req.body;

  const validation = validateUser(userData);

  if (validation.success) {
    Users.add(userData)
      .then(ids => {
        res.status(201).json({ created: ids[0] });
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to create new user" });
      });
  } else {
    res
      .status(400)
      .json({ message: validation.message, errors: validation.errors });
  }
});

function validateUser(user) {
  return { success: false, message: "", errors: [] };
}

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

// list all posts for a user
router.get("/:id/posts", (req, res) => {
  /*
    select p.contents, u.username as saidBy
    from posts as p
    join users as u on p.user_id = u.id
  */

  Users.findUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log("error", error);

      res.status(500).json({ oops: "I did it again" });
    });
});

module.exports = router;

// separation of concerns principle
// connected to the "single responsibility principle"
// a unit should only have one reason to change
