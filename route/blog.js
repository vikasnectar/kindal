const express = require('express');
const middileware = require('../middileware')
const router = express.Router()
const blog = require('../controllers/blog_ctrl') 
// define the home page route
router.get('/',blog.getAllBlogs);
router.post('/add',middileware.checkAuthentication, blog.add);
router.put('/edit',middileware.checkAuthentication, blog.edit);
router.delete('/delete',middileware.checkAuthentication, blog.delete);

router.post('/getBlogsByCategoryname',blog.getBlogsByCategoryname);
router.post('/getBlogsByCategoryId',blog.getBlogsByCategoryId);
router.post('/addBlogCategory',middileware.checkAuthentication, blog.addBlogCategory);
router.put('/editBlogCategory',middileware.checkAuthentication, blog.editBlogCategory);
router.delete('/deleteBlogCategory',middileware.checkAuthentication, blog.deleteBlogCategory);
router.get('/getAllBlogsCategory',middileware.checkAuthentication, blog.getAllBlogsCategory);




module.exports = router