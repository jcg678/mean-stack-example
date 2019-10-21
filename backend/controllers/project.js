'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');
var controller = {
	home: function(req,res){
		return res.status(200).send({
			message: 'Soy la home'
		});

	},
	test: function(req,res){
		return res.status(200).send({
			message: 'Soy el metodo test'
		});
	},
	saveProject: function(req,res){
		var project= new Project();

		var params = req.body;
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		project.save((err, projectStored)=>{
			if(err) return res.status(500).send({message: 'Error al guardar el projecto' });

			if(!projectStored) return res.status(400).send({message: 'No se ha podido guardar el pojecto'});

			return res.status(200).send({project: projectStored});
		});
	},

		getProject: function(req,res){
			var projectId = req.params.id;

			if(projectId == null){
				return res.status(404).send({message:'El proyecto no existe'});
			}

			Project.findById(projectId, (err, project)=>{
					if(err) return res.status(500).send({message: 'Error al devolveder los datos'});

					if(!project) return res.status(404).send({message: "El proyecto no existe"});

					return res.status(200).send({
						project	
					});
			});
		},

		getProjects: function(req,res){
			Project.find({}).sort('-year').exec((err, projects)=>{
				if(err) return res.status(500).send({message:'Error al devolver los datos'});
				if(!projects) return res.status(404).send({message:'No hay proyectos para mostrar'});

				return res.status(200).send({projects});
			});
		},
		updateProject: function(req,res){
			var projectId = req.params.id;
			var update = req.body;

			Project.findByIdAndUpdate(projectId, update, {new:true},(err, projectUpdated)=>{
				if(err) return res.status(500).send({message:'Error al actualizar'});
				if(!projectUpdated) return res.status(404).send({message: 'No se existe el proyecto para actualizar'});

				return res.status(200).send({
					project: projectUpdated
				})


			});
		},
		deleteProject: function(req, res){
			var projectId= req.params.id;

			Project.findByIdAndDelete(projectId, (err,projectRemoved)=>{
				if(err) return res.status(500).send({message:'No se ha podido borrar el projecto'});
				if(!projectRemoved) return  res.status(404).send({message:"No se puede eliminar ese proyecto"});

				return res.status(200).send({
					project: projectRemoved
				});

			});
		},

		uploadImage: function(req,res){
			var projectId = req.params.id;
			var filename = "Imagen no subida ??";

			if(req.files){
				var filePath = req.files.image.path;
				var fileSplit = filePath.split('\\');
				var filename = fileSplit[1];
				var extSlipt  = filename.split('\.');
				var fileExt = extSlipt[1];

				if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
					
					Project.findByIdAndUpdate(projectId, {image: filename}, {new: true}, (err, projectUpdated)=>{

						if(err) return res.status(200).send({message: 'la imagen no se ha subido'});

						if(!projectUpdated) return res.status(404).send({message: 'El projecto no existe'});
							return res.status(200).send({
									project: projectUpdated
							});

					});	

				}else{

					fs.unlink(filePath, (err)=>{
						return res.status(200).send({message: 'la extension no es valida'});
					});

				}




				/*return res.status(200).send({
					files: filename
				});*/
			}else{

				return res.status(200).send({
					message: filename
				})
			}
		},

		getImageFile: function(req, res){
			var file = req.params.image;
			var path_file = './uploads/'+file;
			fs.exists(path_file,(exists)=>{
				if(exists){
					return res.sendFile(path.resolve(path_file));
				}else{
					return res.status(200).send({
						message: "No existe la imagen..."
					});
				}
			});
		}

};

module.exports = controller;