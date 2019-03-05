const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname+'/dist/gitrepoapp'));

app.all('*', (req,res) => {
    res.status(200).sendFile(__dirname+'/dist/gitrepoapp/index.html');
});

app.listen(port);