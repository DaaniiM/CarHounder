const express = require ('express');
const app = express();

app.use(express.static(__dirname + '/CarHounder/carhounder'));
app.get('/*',function(req,res){

    res.sendFile("index.html",{root:__dirname + '/CarHounder/carhounder/'});

});

app.listen(process.env.PORT || 8080);