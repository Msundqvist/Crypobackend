import { Router } from "express";

const routes = Router();

routes.get('/', listAllBlocks)
routes.post('/mine', addBlock)

export default routes; 