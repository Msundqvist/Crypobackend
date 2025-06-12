import express from 'express';
import { addBlock, findBlock, listAllBlocks } from "../controllers/blockchain-controllers.mjs";
import { protect } from '../controllers/auth-controller.mjs';

const router = express.Router();

router.route('/').get(protect, listAllBlocks)
router.route('/mine').post(addBlock)
router.route('/:id').get(findBlock)


export default router; 