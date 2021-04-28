const hbs = require ('hbs')

hbs.registerHelper('listar', (clientes)=>{	
	texto = ""
	clientes.forEach(cl => {		
		texto = `${texto} <tr><td> <button type="submit" class='form-control btn btn-primary btn-sm' name='cedula' value='${cl.cedula}'>Eliminar</button></td> 
						<td> ${cl.cedula} </td> 
						<td> ${cl.nombre} </td>
						<td> ${cl.pais} </td></tr>`
		})
		texto = texto + "</tbody></table>";				
	return texto
})

hbs.registerHelper('listarProductos', (productos)=>{	
	texto = ""
	productos.forEach(pr => {		
		texto = `${texto} <tr> 
						<td> ${pr.id} </td> 
						<td> ${pr.nombreProducto} </td>
						<td> ${pr.precio} </td>
						<td> ${pr.cantidad} </td>
						</tr>`
		})
		texto = texto + "</tbody></table>";				
	return texto
})

hbs.registerHelper('tablacompra', (tabla)=>{	
	texto = ""
	tabla.forEach(pr => {		
		texto = `${texto} <tr> 
						<td> ${pr.cedula} </td> 
						<td> ${pr.nombre} </td>
						<td> ${pr.nombreProducto} </td>
						<td> ${pr.precio} </td>						
						</tr>`
		})
		texto = texto + "</tbody></table>";				
	return texto
})




hbs.registerHelper('listaclientes', (clientes)=>{	
	let texto = "<select name='cedula' class='form-control'>";	
	clientes.forEach(cl => {
		texto = `${texto} <option value='${cl._id}'>${cl.nombre}</option>`		
		})	
		texto = texto + "</select>"
	return texto
})

hbs.registerHelper('listaproductos', (productos)=>{	
	let texto = "<select name='idProducto' class='form-control'>";	
	productos.forEach(cl => {
		texto = `${texto} <option value='${cl._id}'>${cl.nombreProducto}</option>`		
		})	
		texto = texto + "</select>"
	return texto
})

