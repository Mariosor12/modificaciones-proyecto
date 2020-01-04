var express = require('express');
var router = express.Router();
var passport= require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('.././middleware/auth');


// "GET" requests

//router.get('/perfil', AuthMiddleware.isLogged ,controllers.UserController.redirecProfile);
//router.get('/hola', controllers.HomeController.index); //funcion de prueba

//USUARIO

//Obtener informacion del usuario
router.get('/user/info',AuthMiddleware.isLogged, function (req, res) {
console.log('Las cookies son -->', req.cookies);
console.log('El user es  -->', req.user);
res.send(req.user);
})

//Data de los Eventos
router.get('/bd/eventos',controllers.EventsController.getEvents);
router.get('/bd/direccion',controllers.DireccionController.getDirecciones);
router.get('/bd/tiendafisica',controllers.TiendaFisicaController.getTiendaFisica);
router.get('/bd/direccionporclave',controllers.DireccionPorClaveController.getDireccionPorClave);
router.get('/bd/direccionporfk',controllers.DireccionPorFKController.getDireccionPorNombreTipoFK);
router.get('/bd/direccionnombretipo',controllers.DireccionNombreTipoController.getDireccionPorNombreTipo);
router.get('/bd/clienterif',controllers.ClienteRifController.getClientePorRif);
router.get('/bd/clientecedula',controllers.ClienteCedulaController.getClientePorCedula);
router.get('/bd/usuario',controllers.UsuarioController.getUsuarioPorNombre);
router.get('/bd/empleado',controllers.EmpleadoController.getEmpleados);
router.get('/bd/lager',controllers.LagerController.getLager);
router.get('/bd/ale',controllers.AleController.getAle);
router.get('/bd/ingrediente',controllers.IngredienteController.getIngrediente);
router.get('/bd/cervezaartesanal',controllers.CervezaArtesanalController.getCervezaArtesanal);
router.get('/bd/cervezapornombre',controllers.CerveazaPorNombreController.getCervezaPorNombre);
router.get('/bd/historiacerveza',controllers.HistoriaCervezaController.getHistoriaCerveza);
router.get('/bd/receta',controllers.RecetaController.getReceta);
router.get('/bd/recetaingrediente',controllers.RecetaIngredienteController.getRecetaIngrediente);
router.get('/bd/caracteristica',controllers.CaracteristicaController.getCaracteristica);
router.get('/bd/cervezacaracteristica',controllers.CervezaCaracteristicaController.getCervezaCaracteristica);
router.get('/bd/departamento',controllers.DepartamentoController.getDepartamento);
router.get('/bd/privilegio',controllers.PrivilegioController.getPrivilegio);
router.get('/bd/rol',controllers.RolController.getRol);
router.get('/bd/rolprivilegio',controllers.RolPrivilegioController.getRolPrivilegio);
router.get('/bd/motivoslaboralespornombre',controllers.MotivosLaboralesPorNombreController.getMotivosLaboralesPorNombre);
router.get('/bd/horario',controllers.HorarioController.getHorario);
router.get('/bd/beneficio',controllers.BeneficioController.getBeneficio);
router.get('/bd/personalbeneficio',controllers.PersonalBeneficioController.getPersonalBeneficio);
router.get('/bd/personalhorario',controllers.PersonalHorarioController.getPersonalHorario);
router.get('/bd/proveedor',controllers.ProveedorController.getProveedor);
router.get('/bd/proveedorpornombre',controllers.ProveedorPorNombreController.getProveedorPorNombre);
router.get('/bd/cervezaproveedor',controllers.CervezaProveedorController.getCervezaProveedor);
router.get('/bd/eventoproveedor',controllers.EventoProveedorController.getEventoProveedor);
router.get('/bd/pasillo',controllers.PasilloController.getPasillo);
router.get('/bd/zona',controllers.ZonaController.getZona);
router.get('/bd/venta',controllers.VentaController.getVenta);
router.get('/bd/detalleventa',controllers.DetalleVentaController.getDetalleVenta);
router.get('/bd/status',controllers.StatusController.getStatus);
router.get('/bd/statusventa',controllers.StatusVentaController.getStatusVenta);
router.get('/bd/comentariocerveza',controllers.ComentarioCervezaController.getComentarioCerveza);
router.get('/bd/correoelectronico',controllers.CorreoElectronicoController.getCorreoElectronico);
router.get('/bd/compra',controllers.CompraController.getCompra);
router.get('/bd/detallecompra',controllers.DetalleCompraController.getDetalleCompra);
router.get('/bd/inventario',controllers.InventarioController.getInventario);
router.get('/bd/historicoinventario',controllers.HistoricoInventarioController.getHistoricoInventario);
router.get('/bd/historicopuntos',controllers.HistricoPuntosController.getHistoricoPuntos);
router.get('/bd/personacontacto',controllers.PersonaContactoController.getPersonaContacto);
router.get('/bd/telefono',controllers.TelefonoController.getTelefono);
router.get('/bd/pagocredito',controllers.PagoCreditoController.getPagoCredito);
router.get('/bd/pagodebito',controllers.PagoDebitoController.getPagoDebito);
router.get('/bd/pagoefectivo',controllers.PagoEfectivosController.getPagoEfectivo);
router.get('/bd/pagocheque',controllers.PagoChequeController.getPagoCheque);
router.get('/bd/historicotasa',controllers.HistoricoTasaController.getHistoricoTasa);
router.get('/bd/pagodivisa',controllers.PagoDivisaController.getPagoDivisa);
router.get('/bd/historicovalorpuntos',controllers.HistoricoValorPuntosController.getHistoricoValorPuntos);
router.get('/bd/pagopuntos',controllers.PagoPuntosController.getPagoPuntos);
router.get('/bd/cuotaafiliacion',controllers.CuotaAfiliacionController.getCuotaAfiliacion);
router.get('/bd/pago',controllers.PagoController.getPago);
router.get('/bd/statuscompra',controllers.StatusCompraController.getStatusCompra);
router.get('/bd/descuento',controllers.DescuentoController.getDescuento);

//Registrar entrega+paquete
router.post('/entregas/guardar',controllers.PackageController.postPackageRegister);

//AUTENTICACION

//registrarse
router.post('/auth/signup',controllers.UserController.postSignUp);

//Agregar Empleado
router.post('/empleado/agregar',controllers.EmpleadoController.postEmpleado);

//Agregar Evento
router.post('/evento/agregar',controllers.EventsController.postEvento);
//iniciar sesion
router.post('/auth/signin', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		console.log('Dentro de passport.authenticate() callback');
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
		if (err) { return next(err); }
	  if (!user || user === false) { console.log('no usuario'); return res.send(false); }
	  req.logIn(user, function(err) {
		if (err) { return next(err); }
		console.log('Dentro del req.login() callback')
		console.log('User', user);
		console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    console.log(`req.user: ${JSON.stringify(req.user)}`)
		return res.send('login exitoso');
	  });
	})(req, res, next);
	});

	//cerrar sesion
	router.get('/auth/logout', AuthMiddleware.isLogged, controllers.UserController.logout);

module.exports = router;
