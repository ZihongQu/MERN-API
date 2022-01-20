import Express from 'express';
import * as postController from '../controllers/postController.js';
var router = Express.Router();

// Home page route.
router.get('/', postController.getPosts);

router.post('/createPost', postController.createPost);

router.patch('/:id', postController.updatePost);

export default router;