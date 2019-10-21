'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/portafolio')
		.then(()=>{
			console.log("Conexion a la base de datos establecia con exito...");

			app.listen(port, () =>{
				console.log("servidor corriendo correctamente en la url localhost");	
			});

		})
		.catch(err=> console.log(err));

