const express = require('express'),
			pug = require('pug'),
			morgan = require('morgan'),
			bodyParser = require('body-parser'),
			fs = require('fs');

const userRoutes = require('./routes/users'),
			searchRoutes = require('./routes/search'),
			addRoutes = require('./routes/add-user');

const app = express();
		userStore = require('./user-reader');



var likeStore;

fs.readFile('likes.json', function (err, data) {
    if (err) return console.error(err);
   likeStore = (JSON.parse(data));
});


app.use(express.static('public'));

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRoutes);

app.use('/search', searchRoutes);

app.use('/add-user', addRoutes);

app.get('/', (request, response) => {
	response.render('index', { users: userStore.getUsers() });
});

app.get('/api/search/*', (req, res) => {
  var results = userStore.searchUsers(req.params[0]);
  res.json(results);
});

app.post('/like', (request, response) => {
	if(!likeStore.clicked){
  likeStore.likeCount = likeStore.likeCount + 1;
	likeStore.clicked = true;
}

  response.json(likeStore);

  fs.writeFile('likes.json', JSON.stringify(likeStore), (error, data) => {
    if (error) {
      throw error;
    }

    console.log('new likeCount added to likes.json');
  });
});

app.get('/:lastname', (req, res) => {
	show1 = userStore.searchUsers(req.params.lastname);
	console.log('did this part run?');
	console.log(show1[0]);
	console.log(show1[0].lastname);
	res.render('show-1-user', {user: show1[0]});
	//res.redirect('/'+ show1[0].lastname);

});


app.listen(3000, function() {
 console.log('Web server started on port 3000');
});
