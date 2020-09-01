const tagsRouter = require('../node_modules/express').Router();
let Tag = require('../models/tag.model');

tagsRouter.route('/').get(function (req, res) {
    Tag.find(function (err, tags) {
        if (err) {
            console.log(err);
        } else {
            res.json(tags);
        }
    });
});

tagsRouter.route('/update/:id').post(function (req, res) {
    Tag.findById(req.params.id, function (err, tag) {
        if (!tag)
            res.status(404).send("data is not found");
        else{
            tag_name = req.body.tag_name

            tag.save().then(tag => {
                res.json('Tag updated!');
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

tagsRouter.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Snippet.findById(id, function (err, snippet) {
        res.json(snippet); //TODO: error handling
    });
});

tagsRouter.route('/add').post(function (req, res) {
    let tag = new Tag(req.body);
    tag.save()
        .then(tag => {
            res.status(200).json({ 'Tag': 'Tag added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new tag failed');
        });
});

tagsRouter.route('/delete/:id').get(function (req, res) {
    let id = req.params.id;
    Tag.findByIdAndDelete(id, function (err, tag) {
        if (err) {
            console.log(err);
            res.status(400).send('Deleting tag failed');
        }
        else {
            res.status(200).send('Deleted tag successfully.');
        }

    })
});

module.exports = tagsRouter;