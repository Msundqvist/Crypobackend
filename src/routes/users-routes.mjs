
import express from 'express';

import { addUser, listUsers } from '../controllers/users-controllers.mjs';

const router = express.Router();

router.route('/').post(addUser).get(listUsers)

export default router;