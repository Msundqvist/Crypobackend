import { app } from "./app.mjs";

const DEFAULT_PORT = 3000;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;
let NODE_PORT;


if (process.env.GENERATE_NODE_PORT === 'true') {
    NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Server är startad på adress ${PORT} och kör i läge ${process.env.NODE_ENV}`)
})
