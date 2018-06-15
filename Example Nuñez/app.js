// para soportar cross domain
var cors = require('cors')
// servidor web
var express = require('express');
// para recibir y parsear content en formato json
var bodyParser = require('body-parser');

// constante para definir el puerto a ser usado
var PORT_NUMBER = 8080;

// se inicia el servidor web express
var app = express()

// iniciar el parsing de json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// para habilitar cross domain
app.use(cors())

// publicar contenido estatico que esta en ese folder
app.use(express.static("C:\\Users\\Asus\\Desktop\\Movielize\\Example Nuñez"));

//app.get('/getchart', function(req, res) {
//	res.sendFile("C:\\Users\\Asus\\Desktop\\Movielize\\Example Nuñez\\index2.html");
//});

app.post('/savechart', function(req, res) {
	var jsonQuery = req.body.query;
	console.log(jsonQuery);
	//res.set('Content-Type','text/plain');
	res.send("Me cago en tus muertos");
});


// escuchar comunicacion sobre el puerto indicado en HTTP
app.listen(PORT_NUMBER);
console.log("Listening on port "+PORT_NUMBER)