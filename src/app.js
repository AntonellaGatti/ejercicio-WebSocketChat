import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { __direname } from './utils.js';

import chatRouter from "./routers/chat.routers.js"


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__direname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__direname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', chatRouter); 


app.use((error, req, res, next) => {
    const message = `Ha ocurrido un error: ${error.message} `
    console.log(message);
    res
    .status(500)
    .json({status: "error", message})
})


export default app;