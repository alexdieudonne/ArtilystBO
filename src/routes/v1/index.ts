import express from 'express';
import signup from './access/signup';
import login from './access/login';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
// router.use('/', apikey);
/*-------------------------------------------------------------------------*/

router.use('/signup', signup);
router.use('/login', login);

export default router;
