import express from 'express'
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
global.__appdir = dirname;

dotenv.config({ path: './config/config.env' })

const app = express();

app.use(express.json());

export { app }