// para soportar cross domain
var cors = require('cors')
// servidor web
var express = require('express');
// session
var session = require('express-session')
// para recibir y parsear content en formato json
var bodyParser = require('body-parser');
//Init crypto
var crypto = require('crypto');
var decryptedDataG = undefined;
var publicKey;

//Iniciar node-cache
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

// constante para definir el puerto a ser usado
var PORT_NUMBER = 8080;

// se inicia el servidor web express
var app = express()

// Setup of session
app.use(session({
    secret: 'zasdas',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

// iniciar el parsing de json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var file = require('./movies.json');
// para habilitar cross domain
app.use(cors())

// publicar contenido estatico que esta en ese folder
app.use(express.static("C:\\Users\\Asus\\Desktop\\Movielize\\Movielize"));
app.post('/parseQuery', function (req, res) {
	var jsonQuery = req.body.query;
	console.log(jsonQuery);
	jsonQuery = JSON.parse(jsonQuery);
	var dataFiltered = filterApply(jsonQuery);
	dataFiltered.sort(function sortByKey(a, b){  //ordenamiento por anho, agrupado por generos
		return cmp(
			[cmp(a.year, b.year), -cmp(a.genre, b.genre)],
			[cmp(b.year, a.year), -cmp(b.genre, a.genre)]
		);
	});
	var moviesQuantity = Object.keys(dataFiltered).length;
	var yearMin = dataFiltered[0].year;
	var yearMax = dataFiltered[moviesQuantity-1].year;
	var yearDiff = yearMax-yearMin; 
	//console.log("Resultado: " + JSON.stringify(dataFiltered));
	//res.set('Content-Type','text/plain');
	req.session.jsonQuery = dataFiltered;
	req.session.yearDifference = yearDiff;
	req.session.yearMin = yearMin;
	req.session.yearMax = yearMax;
	//Send info to the other page  
	res.send("change page");
});

app.get('/makeGraph', function(req, res){
	res.sendFile("C:\\Users\\Asus\\Desktop\\Movielize\\Movielize\\graph.html");
});

app.get('/getGraph', function(req, res){
	if(decryptedDataG != undefined){
		var moviesQuantity = Object.keys(decryptedDataG).length;
		var yearMin = decryptedDataG[0].year;
		var yearMax = decryptedDataG[moviesQuantity-1].year;
		var yearDiff = yearMax-yearMin; 
		console.log("OKALDIJ");
		//res.set('Content-Type','text/plain');
		req.session.jsonQuery = decryptedDataG;
		req.session.yearDifference = yearDiff;
		req.session.yearMin = yearMin;
		req.session.yearMax = yearMax;
		//Send info to the other page  
		res.send([decryptedDataG, req.session.yearDifference, req.session.yearMin, req.session.yearMax]);
		decryptedDataG = undefined;
	}
	else{
	res.send([req.session.jsonQuery, req.session.yearDifference, req.session.yearMin, req.session.yearMax]);
	}
});

//usin the key for the graph
app.post('/loadKey', function(req, res){
	var keyQuery = req.body.query;
	retrieveCache(keyQuery);
	res.send("done");

});

app.post('/saveGraph', function(req, res){
	encryptCache(req.session.jsonQuery);
	res.send(publicKey);
});


// escuchar comunicacion sobre el puerto indicado en HTTP
app.listen(PORT_NUMBER);

console.log("Listening on port " + PORT_NUMBER);


function filterApply(query) { //utilizar la estructura
	var queryResult = file;
	var temporalResult;
	if (query[0].hasOwnProperty('title')) {
		temporalResult = [];
		queryResult.filter(function (i, n) {
			if (Array.isArray(query[0].title)) {
				query[0].title.forEach(element => {
					if (i.title.toUpperCase().includes(element.toUpperCase())) {
						temporalResult.push(i);
					}
				});
			}
			else if (i.title.toUpperCase().includes(query[0].title.toUpperCase())) {
				temporalResult.push(i);
			}
		})
		queryResult = temporalResult;
	}
	if (query[0].hasOwnProperty('genre')) {
		temporalResult = [];
		queryResult.filter(function (i, n) {
			if (i.genre != null) {

				if (Array.isArray(query[0].genre)) {
					query[0].genre.forEach(element => {
						if (i.genre.toUpperCase().includes(element.toUpperCase())) {
							temporalResult.push(i);
						}
					});
				}

				else if (i.genre.toUpperCase().includes(query[0].genre.toUpperCase())) {
					temporalResult.push(i);
				}
			}
		})
		queryResult = temporalResult;
	}

	if (query[0].hasOwnProperty('cast')) {
		temporalResult = [];
		queryResult.filter(function (i, n) {
			if (i.cast != null) {

				if (Array.isArray(query[0].cast)) {
					query[0].cast.forEach(element => {
						if (i.cast.toUpperCase().includes(element.toUpperCase())) {
							temporalResult.push(i);
						}
					});
				}

				else if (i.cast.toUpperCase().includes(query[0].cast.toUpperCase())) {
					temporalResult.push(i);
				}
			}
		})
		queryResult = temporalResult;
	}

	if (query[0].hasOwnProperty('director')) {
		temporalResult = [];
		queryResult.filter(function (i, n) {
			if (i.director != null) {

				if (Array.isArray(query[0].director)) {
					query[0].director.forEach(element => {
						if (i.director.toUpperCase().includes(element.toUpperCase())) {
							temporalResult.push(i);
						}
					});
				}

				else if (i.director.toUpperCase().includes(query[0].director.toUpperCase())) {
					temporalResult.push(i);
				}
			}
		})
		queryResult = temporalResult;
	}

	if (query[0].hasOwnProperty('notes')) {
		temporalResult = [];
		queryResult.filter(function (i, n) {
			if (i.notes != null) {

				if (Array.isArray(query[0].notes)) {
					query[0].notes.forEach(element => {
						if (i.notes.toUpperCase().includes(element.toUpperCase())) {
							temporalResult.push(i);
						}
					});
				}

				else if (i.notes.toUpperCase().includes(query[0].notes.toUpperCase())) {
					temporalResult.push(i);
				}
			}
		})
		queryResult = temporalResult;
	}
	if(query[0].hasOwnProperty('year')){

		temporalResult = [];
		queryResult.filter(function (i,n){
			if(Array.isArray(query[0].year)){
				query[0].year.forEach(element =>{
					if(i.year === element){
						temporalResult.push(i);
					}	
				})
			}
			else if(typeof query[0].year === "string"){
				var yearRange = query[0].year.split("-",2);
				if(i.year >= yearRange[0] && i.year <= yearRange[1]){
					temporalResult.push(i);
				}
			}
			else if(typeof query[0].year === "number"){
				if(i.year === query[0].year){
					temporalResult.push(i);
				}
			}
	})
	queryResult = temporalResult;

	}
	return queryResult;
}


cmp = function(x, y){
	return x>y ? 1 : x<y ? -1 : 0
}

function keyGenerator() {
	var letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var color = '';
	for (var i = 0; i < 10; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function retrieveCache(keyValue){
	myCache.get( keyValue, function( err, value ){
		if( !err ){
		  if(value == undefined){
			console.log("Invalid key.");
		  }else{
			var decryptedData = decrypt(value,keyValue);
			//console.log(decryptedData);
			decryptedDataG = decryptedData;
			return decryptedData;
		  }
		}
	  });
}

function encryptCache(data){
	var queryKey = keyGenerator();
	publicKey = queryKey;
	//console.log("Generated key: "+queryKey);
	myCache.set( queryKey, encrypt(data,queryKey), function( err, success ){//Save the query
		if( !err && success ){
		  console.log("status:"+ success );
		}
	  });
}

function encrypt(data,key) {
    try {
        var cipher = crypto.createCipher('aes-256-cbc', key);
        var encrypted = Buffer.concat([cipher.update(new Buffer(JSON.stringify(data), "utf8")), cipher.final()]);
        return encrypted;
    } catch (exception) {
        throw new Error(exception.message);
    }
}

function decrypt(data, key) {
    try {
        var decipher = crypto.createDecipher("aes-256-cbc", key);
        var decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
        return JSON.parse(decrypted);
    } catch (exception) {
        throw new Error(exception.message);
    }
}