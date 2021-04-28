const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const productosSchema = new Schema ({
    
	nombreProducto : {
		type : String,
		required : true	,
		unique : true	
	},
	precio : {
		type : Number,
		required : true
	},
	cantidad : {
		type : Number,
		default : 0,
		min : 0
	}
});
productosSchema.plugin(AutoIncrement, {inc_field: 'id'});
const Producto = mongoose.model('Producto', productosSchema);

//ClienteProducto
const clienteproductoSchema = new Schema ({		
	documento : {
		type : Schema.Types.ObjectId,
		ref: 'Cliente' 
	},
	idProducto : {
		type : Schema.Types.ObjectId,
		ref: 'Producto' 
	},
	fecha : {
		type: Date,
		default: Date.now()
	}
});

clienteproductoSchema.plugin(AutoIncrement, {inc_field: 'idCP'});

const ClienteProducto = mongoose.model('ClienteProducto', clienteproductoSchema);

module.exports = {	Producto , ClienteProducto }