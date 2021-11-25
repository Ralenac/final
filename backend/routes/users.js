var express = require('express');
var router = express.Router();
const db = require('../db');
const users = require('../helpers/users_queries')
const { editAbout, editAvatar } = users(db)


/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
      db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

});

// edit avatar
router.put("/", (req, res) => {
  const { avatar, id } = req.body
  
  editAvatar(avatar, id)
    .then(data => {

      console.log("data from users.js edit avatar put route",data);
      res.json({ data });
     
    })
    .catch(err => {
      console.log(err.message);
    })
});


// edit about me section
router.put("/", (req, res) => {
  const { about, id } = req.body
  
  editAbout(about, id)
    .then(user => {

      console.log("user from users.js backend: ",user);
    // if (!user) {
    //    res.send({error: "error no user"});
    //    return;
    // }
    res.send("added to database");
     
    })
    .catch(err => {
      console.log(err.message);
    })
});

module.exports = router;