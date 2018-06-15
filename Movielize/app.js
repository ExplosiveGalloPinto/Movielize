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
var file = require('./movies.json'); //(with path)
// para habilitar cross domain
app.use(cors())

// publicar contenido estatico que esta en ese folder
app.use(express.static("C:\\Users\\Andres\\Desktop\\Movielize\\Movielize"));

//app.get('/getchart', function(req, res) {
//	res.sendFile("C:\\Users\\Asus\\Desktop\\Movielize\\Example Nuñez\\index2.html");
//});

app.post('/savechart', function(req, res) {
	var jsonQuery = req.body.query;
	jsonQuery = JSON.parse(jsonQuery);
	var dataFiltered = filterApply(jsonQuery);
	console.log("Resultado: "+ JSON.stringify(dataFiltered));
	//res.set('Content-Type','text/plain');
	//res.send("Me cago en tus muertos");
	res.send(dataFiltered);
});


// escuchar comunicacion sobre el puerto indicado en HTTP
app.listen(PORT_NUMBER);
console.log("Listening on port "+PORT_NUMBER);


function filterApply(query){ //utilizar la estructura
	var queryResult = file;
	var temporalResult;
	if(query[0].hasOwnProperty('title')){
		temporalResult = [];
		queryResult.filter(function (i,n){
			if(Array.isArray(query[0].title)){
				query[0].title.forEach(element => {
					if(i.title.includes(element)){
						temporalResult.push(i);
					}
				});
			}
			else if(i.title.includes(query[0].title)){
				temporalResult.push(i);
			}
	})
	queryResult = temporalResult;
	}
	if(query[0].hasOwnProperty('genre')){
		temporalResult = [];
		queryResult.filter(function (i,n){
			if(i.genre != null){
			
				if(Array.isArray(query[0].genre)){
					query[0].genre.forEach(element => {
						if(Array.isArray(i.genre)){
							i.genre.forEach(elementg => {
								if(elementg.includes(element)){
									temporalResult.push(i);
								}
							})
						}
						else if(i.genre.includes(element)){
							temporalResult.push(i);
						}
					});
				}
				else if(Array.isArray(i.genre)){
					i.genre.forEach(elementg => {
						if(elementg.includes(query[0].genre)){
							temporalResult.push(i);
						}
					})
				}

				else if(i.genre.includes(query[0].genre)){
					temporalResult.push(i);
				}
		}})
	queryResult = temporalResult;
	}

	if(query[0].hasOwnProperty('cast')){
		temporalResult = [];
		queryResult.filter(function (i,n){
			if(i.cast != null){
			
				if(Array.isArray(query[0].cast)){
					query[0].cast.forEach(element => {
						if(Array.isArray(i.cast)){
							i.cast.forEach(elementg => {
								if(elementg.includes(element)){
									temporalResult.push(i);
								}
							})
						}
						else if(i.cast.includes(element)){
							temporalResult.push(i);
						}
					});
				}
				else if(Array.isArray(i.cast)){
					i.cast.forEach(elementg => {
						if(elementg.includes(query[0].cast)){
							temporalResult.push(i);
						}
					})
				}

				else if(i.cast.includes(query[0].cast)){
					temporalResult.push(i);
				}
		}})
	queryResult = temporalResult;
	}
	
	if(query[0].hasOwnProperty('director')){
		temporalResult = [];
		queryResult.filter(function (i,n){
			if(i.director != null){
			
				if(Array.isArray(query[0].director)){
					query[0].director.forEach(element => {
						if(Array.isArray(i.director)){
							i.director.forEach(elementg => {
								if(elementg.includes(element)){
									temporalResult.push(i);
								}
							})
						}
						else if(i.director.includes(element)){
							temporalResult.push(i);
						}
					});
				}
				else if(Array.isArray(i.director)){
					i.director.forEach(elementg => {
						if(elementg.includes(query[0].director)){
							temporalResult.push(i);
						}
					})
				}

				else if(i.director.includes(query[0].director)){
					temporalResult.push(i);
				}
		}})
	queryResult = temporalResult;
	}
		
	if(query[0].hasOwnProperty('notes')){
		temporalResult = [];
		queryResult.filter(function (i,n){
			if(i.notes != null){
			
				if(Array.isArray(query[0].notes)){
					query[0].notes.forEach(element => {
						if(Array.isArray(i.notes)){
							i.notes.forEach(elementg => {
								if(elementg.includes(element)){
									temporalResult.push(i);
								}
							})
						}
						else if(i.notes.includes(element)){
							temporalResult.push(i);
						}
					});
				}
				else if(Array.isArray(i.notes)){
					i.notes.forEach(elementg => {
						if(elementg.includes(query[0].notes)){
							temporalResult.push(i);
						}
					})
				}

				else if(i.notes.includes(query[0].notes)){
					temporalResult.push(i);
				}
		}})
	queryResult = temporalResult;
	}
	if(query[0].hasOwnProperty('year')){
		console.log("soplame year caso 0");
	}
	return queryResult;
}