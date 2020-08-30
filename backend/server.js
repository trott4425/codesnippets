const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const passport = require('passport');
const jwt = require('jsonwebtoken');

const PORT = 4000;
const codeSnippetRoutes = express.Router();
const userRoutes = express.Router();

let Snippet = require('./models/Snippet.model');
let Tag = require('./models/tag.model');
let User = require('./models/user.model');

var corsOptions = {
    origin: 'http://127.0.0.1:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/codesnippets', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})


codeSnippetRoutes.route('/').get(function (req, res) {
    Snippet.find(function (err, snippets) {
        if (err) {
            console.log(err);
        } else {
            res.json(snippets);
        }
    });
});

codeSnippetRoutes.route('/update/:id').post(function (req, res) {
    Snippet.findById(req.params.id, function (err, snippet) {
        if (!snippet)
            res.status(404).send("data is not found");
        else{
            snippet.snippet_description = req.body.snippet_description;
            snippet.snippet_author = req.body.snippet_author;
            snippet.snippet_tags = req.body.snippet_tags;
            snippet.snippet_code = req.body.snippet_code;

            snippet.save().then(snippet => {
                res.json('Snippet updated!');
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

codeSnippetRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Snippet.findById(id, function (err, snippet) {
        res.json(snippet); //TODO: error handling
    });
});

codeSnippetRoutes.route('/add').post(function (req, res) {
    let snippet = new Snippet(req.body);
    snippet.save()
        .then(snippet => {
            res.status(200).json({ 'Snippet': 'Snippet added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new snippet failed');
        });
});

codeSnippetRoutes.route('/delete/:id').get(function (req, res) {
    let id = req.params.id;
    Snippet.findByIdAndDelete(id, function (err, snippet) {
        if (err) {
            console.log(err);
            res.status(400).send('Deleting snippet failed');
        }
        else {
            res.status(200).send('Deleted snippet successfully.');
        }

    })
});

userRoutes.route('/register').post(function (req, res) {
    let user = new User(req.body);
    user.save()
        .then(todo => {
            res.status(200).json({ 'User': 'User registered successfully.' });
        })
        .catch(err => {
            res.status(400).send('Unable to register that user at this time.');
        });
});

/*userRoutes.route('/login').post(function(req, res){
    console.log(req.body);
    User.findOne({ username: req.body.username }, function(err, user) {
        if(!user)
            res.status(400).send('Login failed.');
        else
            user.comparePassword(req.body.password, function(err, isMatch) {
                if(err)
                    res.status(400).send('Login failed.');

                res.status(200).send('Login succeeded');
            });
    });
})*/
userRoutes.route('/login').post(async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                console.log(err);
                const error = new Error('An Error occurred')
                return next(error);
            }

            if(!user){
                return res.status(200).send('Login failed');
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error)
                //We don't want to store the sensitive information such as the
                //user password in the token so we pick only the username and id
                const body = { _id: user._id, username: user.username };
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({ user: body }, 'top_secret'); //TODO: add secret to key file
                //Send back the token to the user
                res.cookie("token", token, { domain: '127.0.0.1', httponly: true, secure: false, sameSite: false})
                res.status(200).send('Authentication successful');
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});


app.use('/codesnippets', codeSnippetRoutes);
app.use('/user', userRoutes);

//Handle errors
/*app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error : err });
  });

*/
  
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});