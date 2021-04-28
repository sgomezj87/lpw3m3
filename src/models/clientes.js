const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const clientesSchema = new Schema ({
	cedula : {
		type : Number,
		required : true
	},
	nombre : {
		type : String,
		required : true,
		trim : true
	},
	contrasena : {
		type : String,
		required : true
	},
	pais : {
		type : String,
		default : "Colombia",
		trim: true
	},
	compra : [{
		type : Schema.Types.ObjectId,
		ref: 'Producto' 
	}]
});

const Cliente = mongoose.model('Cliente', clientesSchema);
module.exports = Cliente
