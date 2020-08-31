const codeSnippetRoutes = require('../node_modules/express').Router();
let Snippet = require('../models/Snippet.model');

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
            snippet_short_description = req.body.snippet_short_description;
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

module.exports = codeSnippetRoutes;