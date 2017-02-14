const express = require('express'),
      fs = require('fs'),
      router = express.Router();

const userStore = require('./../user-reader');

router.get('/', (request, response) => {
  response.render('users/index');
});


// router.get('/:lastname', (req, res) => {
// 	show1 = userStore.searchUsers(req.params.lastname);
// 	console.log('did this part run?');
// 	console.log(show1[0]);
// 	res.render('show-1-user', {user: show1[0]});

// });

module.exports = router;
