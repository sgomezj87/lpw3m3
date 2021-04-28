const express = require('express')
const app = express()
const path = require ('path')
const hbs = require ('hbs')
const bodyParser = require ('body-parser')
require('./../helpers/helpers')
const dirPublic = path.join(__dirname, "../../public")
const dirViews = path.join(__dirname, "../../template/views")
const dirPartials = path.join(__dirname, '../../template/partials')
const Cliente = require ('./../models/clientes')
const {Producto, ClienteProducto} = require ('./../models/productos')
//const bcrypt = require('bcryptjs');
//const saltRounds = 10;

//hbs
app.set('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials)

//Paginas
app.get('/', function (req, res) {
	console.log('ingresa')
  res.render('index', {
  	titulo: 'Inicio',
  	mensaje: ''
  })
})

app.post('/', function (req, res) {
console.log(parseInt(req.body.usuario), req.body.contrasena)
	mensaje="";
	Cliente.findOne({cedula : parseInt(req.body.usuario)},(err, resultado)=>{
			if (err){
				return console.log(err)
			}
			if (!resultado){
				mensaje= "El usuario no existe"
			}
			else{/*
				if(!bcrypt.compareSync(req.body.contrasena, resultado.contrasena)){
					mensaje= "Contraseña incorrecta"
				}
				else{*/
					req.session.usuario = resultado._id
					console.log("variable de sesión" + req.session.usuario)
					req.session.nombre = resultado.nombre
					mensaje= "Bienvenid@ " + resultado.nombre
				//}	
				
			}
			res.render('index',{
			titulo: 'Inicio',
			mensaje: mensaje,
			sesion : true
			})
	})

})

app.get('/clientes', function (req, res){
	Cliente.find({},(err, resultado)=>{
		if (err){
			return console.log(err)
		}
		console.log(resultado)
		res.render('clientes', {
		titulo:'Clientes',
		res: resultado	
	})
})
})

app.post('/clientes', function(req, res) {
	Cliente.findOne({cedula : parseInt(req.body.cedula)},(err, resultado)=>{
		if (err){
			return console.log(err)
		}
		console.log(resultado)
		res.render('clientes2',{
		titulo: 'Ver cliente',
		cedula: resultado.cedula,
		nombre: resultado.nombre,
		pais: resultado.pais
		})
	})
});

app.get('/registrar', function (req, res){
	res.render('registrar', {
		titulo:'Regristar'		
	})
})

app.get('/productos', function (req, res){
	Producto.find({cantidad:{$gt: 15}},(err,resultado)=>{
				res.render('productos', {
				titulo:'Productos',
				res: resultado		
			})
	})
})

app.post('/productos', function (req, res){
	let producto = new Producto ({
		nombreProducto : req.body.nombre,
		precio : parseInt(req.body.precio),
		cantidad : parseInt(req.body.cantidad)
	})
	producto.save ((err,resultado)=>{
		if (err){
			Producto.find({},(err,resultado)=>{
			res.render('productos', {
				titulo:'Productos',
				error : 'Ya existe',
				res: resultado	
				})
			})
			return 
		}
			console.log(resultado)
			Producto.find({},(err,resultado)=>{
				res.render('productos', {
				titulo:'Productos',
				res: resultado		
			})
		})				
	})
})
/*
app.get('/clienteproducto', (req, res)=>{	
	listado = []
	Producto.find({},(err,resproductos)=>{
		Cliente.find({},(err, resclientes)=>{	
			Cliente.findById(req.session.usuario).populate('compra').
  			exec(function (err, resultado) {
    			if (err) return handleError(err);    			  				
    				resultado.compra.forEach(res2 => {   					
    					listado.push({
    					cedula : resultado.cedula,
    					nombre : resultado.nombre,
    					nombreProducto : res2.nombreProducto,
    					precio : res2.precio    					
    					})    				 	
    				})    			
  						
  			res.render('clienteproducto', {
						titulo:'Comprar',
						resp: resproductos,
						resc: resclientes,
						tabla : listado
						})		
			})					
		})				
	})
})
*/

//CON ESQUEMA CLIENTE CON VECTOR


app.get('/clienteproducto', (req, res)=>{	
	listado = []
	Producto.find({},(err,resproductos)=>{
		Cliente.find({ _id : req.session.usuario },(err, resclientes)=>{	
			Cliente.find().populate('compra').
  			exec(function (err, resultado) {
    			if (err) return handleError(err);
    			resultado.forEach(res => { 
    			    console.log(res)   				
    				res.compra.forEach(res2 => {   					
    					listado.push({
    					cedula : res.cedula,
    					nombre : res.nombre,
    					nombreProducto : res2.nombreProducto,
    					precio : res2.precio    					
    					})    				 	
    				})    			
  				});		
  			res.render('clienteproducto', {
						titulo:'Comprar',
						resp: resproductos,
						resc: resclientes,
						tabla : listado
						})		
			})					
		})				
	})
})
app.post('/clienteproducto', (req, res)=>{	
	listado = []
	//Cliente.findOneAndUpdate({_id : req.body.cedula},{"$push": { compra : req.body.idProducto }},{new:true},(err, resultado)=>{
		Cliente.findOneAndUpdate({_id: req.body.cedula},{"$push": {compra : req.body.idProducto}},{new:true},(err, resultado)=>{
			Producto.find({},(err,resproductos)=>{
				Cliente.find({},(err, resclientes)=>{	
			Cliente.find().populate('compra').
  			exec(function (err, resultado) {

    			if (err) return handleError(err);
    					resultado.forEach(res => {    				
    						res.compra.forEach(res2 => {   					
		    					listado.push({
		    					cedula : res.cedula,
		    					nombre : res.nombre,
		    					nombreProducto : res2.nombreProducto,
		    					precio : res2.precio    					
		    					})    				 	
    						})    			
  						});		
  					res.render('clienteproducto', {
						titulo:'Comprar',
						resp: resproductos,
						resc: resclientes,
						tabla : listado
						})		
				})
			})
		})	
	})
})

/* CON ESQUEMA CLIENTE PRODUCTO
app.get('/clienteproducto', (req, res)=>{	
	listado = []
	Producto.find({},(err,resproductos)=>{
		Cliente.find({},(err, resclientes)=>{			
			ClienteProducto.find().populate('documento').populate('idProducto').
  			exec(function (err, resultado) {
    			if (err) return handleError(err);
    			console.log(resultado);
    			resultado.forEach(res => {
    				listado.push({
    					cedula : res.documento.cedula,
    					nombre : res.documento.nombre,
    					nombreProducto : res.idProducto.nombreProducto,
    					precio : res.idProducto.precio
    				})
    				console.log(listado)
    			})
    			res.render('clienteproducto', {
						titulo:'Comprar',
						resp: resproductos,
						resc: resclientes,
						tabla : listado
						})	
  			});							
    				
			})					
		})				
	})

app.post('/clienteproducto', (req, res)=>{	
	listado = []
	//Cliente.findOneAndUpdate({_id : req.body.cedula},{"$push": { compra : req.body.idProducto }},{new:true},(err, resultado)=>{
	let clienteproducto = new ClienteProducto ({
		documento : req.body.cedula,
		idProducto : req.body.idProducto
	})
	clienteproducto.save ((err,resultado)=>{		
		Producto.find({},(err,resproductos)=>{
		Cliente.find({},(err, resclientes)=>{	
		ClienteProducto.find().populate('documento').populate('idProducto').
  			exec(function (err, resultado) {
    			if (err) return handleError(err);
    			console.log(resultado);
    			resultado.forEach(res => {
    				listado.push({
    					cedula : res.documento.cedula,
    					nombre : res.documento.nombre,
    					nombreProducto : res.idProducto.nombreProducto,
    					precio : res.idProducto.precio
    				})
    				console.log(listado)
    			})
    			res.render('clienteproducto', {
						titulo:'Comprar',
						resp: resproductos,
						resc: resclientes,
						tabla : listado
						})	
  			});		
			})
		})
	})
})
*/
app.post('/registrar', function (req, res){
	//const salt = bcrypt.genSaltSync(saltRounds);
	let cliente = new Cliente ({
		cedula: req.body.cedula,
		contrasena: req.body.contrasena,//bcrypt.hashSync(req.body.contrasena, salt),
		nombre: req.body.nombre,
		pais: req.body.pais	
	})

	cliente.save ((err, resultado)=>{
		if (err){
			return console.log(err)
		}
		console.log("ingresado a la BD")
		res.render('registrar', {
		titulo:'Regristar',		
		mensaje: 'Se ha creado con exito'	
		})
	})

	
})

app.post('/actualizar', function (req, res){
	Cliente.findOneAndUpdate({cedula : parseInt(req.body.cedula)},{nombre:req.body.nombre, pais : req.body.pais},{new:true},(err, resultado)=>{
		if (err){
			return console.log(err)
		}
		console.log(resultado)
		res.render('actualizar',{
			titulo:'Actualizar',
			cedula: resultado.cedula,
			nombre: resultado.nombre,
			pais: resultado.pais	
		})
	})

})

app.post('/eliminar', function (req, res){
	Cliente.findOneAndDelete({cedula : parseInt(req.body.cedula)},(err, eliminado)=>{
		if (err){
			return console.log(err)
				}
		
		Cliente.find({},(err, resultado)=>{
		if (err){
			return console.log(err)
		}
		console.log("resultado de eliminación" + eliminado)
		console.log("el nombre es" + eliminado.nombre)
		res.render ('eliminar',{
				titulo: 'Eliminar',
				res: resultado,
				nombre: eliminado.nombre
		})		
	})
	})
})


app.post('/listar',(req, res) =>{
	funciones.listarclientes()
})


app.get('/salir', (req, res) => {
	req.session.destroy((err) => {
  		if (err) return console.log(err) 	
	})	
	res.redirect('/')	
})

//res.redirect('/')
//error 404
app.get('*',function (req, res) {
	res.render('error', {
		titulo: 'Error 404'
	})
})

module.exports = app