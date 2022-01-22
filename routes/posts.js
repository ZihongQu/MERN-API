import Express from 'express';
import * as postController from '../controllers/postController.js';
var router = Express.Router();

// Home page route.
router.get('/', postController.getPosts);

router.post('/createPost', postController.createPost);

router.patch('/:id', postController.updatePost);

router.delete('/:id', postController.deletePost);

router.patch('/:id/likePost', postController.likePost);

export default router;