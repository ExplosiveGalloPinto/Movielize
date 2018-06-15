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
app.use(express.static("C:\\Users\\Asus\\Desktop\\Movielize\\Example Nuñez"));

//app.get('/getchart', function(req, res) {
//	res.sendFile("C:\\Users\\Asus\\Desktop\\Movielize\\Example Nuñez\\index2.html");
//});

app.post('/savechart', function(req, res) {
	var jsonQuery = req.body.query;
	jsonQuery = JSON.parse(jsonQuery);
	filterApply(jsonQuery);
	//res.set('Content-Type','text/plain');
	//res.send("Me cago en tus muertos");
	res.send(file);

});


// escuchar comunicacion sobre el puerto indicado en HTTP
app.listen(PORT_NUMBER);
console.log("Listening on port "+PORT_NUMBER)
console.log("print del json: "+JSON.stringify(file[0]));


function filterApply(query){ //utilizar la estructura
	console.log(JSON.stringify(query));
	if(query[0].hasOwnProperty('title')){
		file.filter(function (i,n){
			if(Array.isArray(query[0].title)){
				query[0].title.forEach(element => {
					if(i.title.includes(element)){
						console.log("ENCONTRE: "+ JSON.stringify(i));
					}
				});
			}
			else if(i.title.includes(query[0].title)){
				console.log("ENCONTRE: "+ JSON.stringify(i));
			}
	})

	}
	if(query[0].hasOwnProperty('genre')){
		console.log("soplame genre");
		file.filter(function (i,n){
			if(i.genre != null){
			
				if(Array.isArray(query[0].genre)){
					query[0].genre.forEach(element => {
						if(Array.isArray(i.genre)){
							i.genre.forEach(elementg => {
								if(elementg.includes(element)){
									console.log("ENCONTRE: "+ JSON.stringify(i));
								}
							})
						}
						else if(i.genre.includes(element)){
							console.log("ENCONTRE: "+ JSON.stringify(i));
						}
					});
				}
				else if(Array.isArray(i.genre)){
					i.genre.forEach(elementg => {
						if(elementg.includes(query[0].genre)){
							console.log("ENCONTRE: "+ JSON.stringify(i));
						}
					})
				}

				else if(i.genre.includes(query[0].genre)){
					console.log("ENCONTRE: "+ JSON.stringify(i));
				}
		}})
	}

	if(query[0].hasOwnProperty('cast')){
		console.log("soplame cast");
		file.filter(function (i,n){
			if(i.cast != null){
			
				if(Array.isArray(query[0].cast)){
					query[0].cast.forEach(element => {
						if(Array.isArray(i.cast)){
							i.cast.forEach(elementg => {
								if(elementg.includes(element)){
									console.log("ENCONTRE: "+ JSON.stringify(i));
								}
							})
						}
						else if(i.cast.includes(element)){
							console.log("ENCONTRE: "+ JSON.stringify(i));
						}
					});
				}
				else if(Array.isArray(i.cast)){
					i.cast.forEach(elementg => {
						if(elementg.includes(query[0].cast)){
							console.log("ENCONTRE: "+ JSON.stringify(i));
						}
					})
				}

				else if(i.cast.includes(query[0].cast)){
					console.log("ENCONTRE: "+ JSON.stringify(i));
				}
		}})
	}
	
	if(query[0].hasOwnProperty('director')){
		console.log("soplame director");
		file.filter(function (i,n){
			if(i.director != null){
			
				if(Array.isArray(query[0].director)){
					query[0].director.forEach(element => {
						if(Array.isArray(i.director)){
							i.director.forEach(elementg => {
								if(elementg.includes(element)){
									console.log("ENCONTRE: "+ JSON.stringify(i));
								}
							})
						}
						else if(i.director.includes(element)){
							console.log("ENCONTRE: "+ JSON.stringify(i));
						}
					});
				}
				else if(Array.isArray(i.director)){
					i.director.forEach(elementg => {
						if(elementg.includes(query[0].director)){
							console.log("ENCONTRE: "+ JSON.stringify(i));
						}
					})
				}

				else if(i.director.includes(query[0].director)){
					console.log("ENCONTRE: "+ JSON.stringify(i));
				}
		}})
	}
		
	if(query[0].hasOwnProperty('notes')){
		console.log("soplame notes");
		file.filter(function (i,n){
			if(i.notes != null){
			
				if(Array.isArray(query[0].notes)){
					query[0].notes.forEach(element => {
						if(Array.isArray(i.notes)){
							i.notes.forEach(elementg => {
								if(elementg.includes(element)){
									console.log("ENCONTRE: "+ JSON.stringify(i));
								}
							})
						}
						else if(i.notes.includes(element)){
							console.log("ENCONTRE: "+ JSON.stringify(i));
						}
					});
				}
				else if(Array.isArray(i.notes)){
					i.notes.forEach(elementg => {
						if(elementg.includes(query[0].notes)){
							console.log("ENCONTRE: "+ JSON.stringify(i));
						}
					})
				}

				else if(i.notes.includes(query[0].notes)){
					console.log("ENCONTRE: "+ JSON.stringify(i));
				}
		}})
	}
	if(query[0].hasOwnProperty('year')){
		console.log("soplame year caso 0");
	}
	
}