import express from 'express';
import { addBlock, findBlock, listAllBlocks } from "../controllers/blockchain-controllers.mjs";
import { protect, authorize } from '../controllers/auth-controller.mjs';

const router = express.Router();

router.route('/').get(protect, listAllBlocks)
router.route('/mine').post(protect, authorize('miner', 'admin'), addBlock)
router.route('/:id').get(protect, findBlock)


export default router; 