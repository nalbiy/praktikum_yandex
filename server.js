express=require("express")
//import path from 'path';
//import { fileURLToPath } from 'url';
//const express = require('express')
const app=express()
const PORT = 3000
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
console.log(__dirname)

app.use(express.static('./dist/'))
app.get('/*', function (req, res){
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, function (){
    console.log(`listen on port ${PORT}`)
})