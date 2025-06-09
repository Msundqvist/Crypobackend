import { Router } from "express";
import { addBlock, listAllBlocks } from "../controllers/blockchain-controllers.mjs";

const routes = Router();

routes.get('/').get(listAllBlocks).post(addBlock)
routes.post('/mine')

export default routes; 