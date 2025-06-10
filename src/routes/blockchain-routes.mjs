import { Router } from "express";
import { addBlock, findBlock, listAllBlocks } from "../controllers/blockchain-controllers.mjs";

const router = Router();

router.route('/').get(listAllBlocks)
router.route('/mine').post(addBlock)
router.route('/:id').get(findBlock)


export default router; 