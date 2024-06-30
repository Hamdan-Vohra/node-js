const express = require('express')
const router = express.Router();
const blogController = require('../controllers/blogController')

//get request
router.get('/', blogController.blog_index);
// post request
router.post('/', blogController.blog_post)
//blog create page(we have to place it above '/blogs/:id' because express will fire the '/blogs/:id' route if we are trying to route '/blog/create' beacause the variable's value can be of string type)
router.get('/create', blogController.blog_create_get)
// get individual blog details by its id
router.get('/:id', blogController.blog_details)
//delete blog by its id
router.delete('/:id', blogController.blog_delete)

module.exports = router