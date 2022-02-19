import Express from 'express';
import * as postController from '../controllers/postController.js';
import auth from '../middleware/auth.js';
var router = Express.Router();

// Home page route.
router.get('/', postController.getPosts);

router.get('/search', postController.getPostsBySearch);

router.post('/createPost', auth, postController.createPost);

router.patch('/:id', auth, postController.updatePost);

router.delete('/:id', auth, postController.deletePost);

router.patch('/:id/likePost', auth, postController.likePost);

router.get('/:id', postController.getPostById);

export default router;