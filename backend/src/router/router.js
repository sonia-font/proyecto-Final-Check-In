import express from 'express'
import ServicioEmpleados from '../servicios/servicioEmpleados.js'
import ServicioHoteles from '../servicios/servicioHoteles.js'
import ServicioHuespedes from '../servicios/servicioHuespedes.js'
import ServicioReservas from '../servicios/servicioReservas.js'
import ParseService from '../shared/parser/parseService.js'
import {crearMailer} from "../shared/mails/Factory_Mailer.js"
import configMailer from "../shared/mails/config.js"


class Router {

    constructor(){
        this.servEmpleados = new ServicioEmpleados()
        this.servHuespedes = new ServicioHuespedes()
        this.servReservas = new ServicioReservas()
        this.servHoteles = new ServicioHoteles()
        this.parseService = new ParseService()        
    }

    createRouter(){
        const router = express.Router()

        // Recibe el id del hotel por parametro y nombre, apellido, email y password de un empleado por body. 
        // Lo agrega al hotel correspondiente. 
        router.post('/:idHotel/empleado/crear', async(req, res, next) => {
            try {
                await this.servHoteles.agregarEmpleado(req.params.idHotel, req.body)
                res.status(201).send({msg: "Empleado agregado exitosamente"})
            } catch(error) {
                next(error)
            }
        });

        // Recibe el id del hotel por parametro, inicio y fin de la reserva y nombre, apellido y mail del huesped por el body. 
        // La agrega al hotel correspondiente. 
        router.post('/:idHotel/reserva/crear', async(req, res, next) => {
            try {
                await this.servHoteles.agregarReserva(req.params.idHotel,req.body.reserva,req.body.huesped)
                res.status(201).send({msg: "Reserva agregada exitosamente"})
            } catch(error) {
                next(error)
            }
        });

        // Recibe nombre, coordenadas y template del hotel y lo agrega a la base de hoteles.
        router.post('/hotel/crear', async(req, res, next) => {
            try {
                await this.servHoteles.agregar(req.body)
                res.status(201).send({msg: "Hotel creado exitosamente"})
            } catch(error) {
                next(error)
            }
        });

        // Tiene que recibir un multipart/form-data con la foto(nombre y ubicacion)
        router.post('/:codReserva/actualizar/foto', async(req, res, next) => {
            try {
                var fotoDir = this.parseService.parsePhoto(req)
                await this.servHoteles.actualizarReserva(req.params.codReserva,fotoDir,null)
                res.status(201).send({msg: "Foto guardada exitosamente"})
            } catch(error) {
                next(error)
            }
        })

        // Recibe un codigo de reserva y devuelve la reserva encontrada o 404 not found
        router.get('/usuario/:codReserva', async(req, res, next) => {
            try {
                const reserva = await this.servHoteles.buscarReserva(req.params.codReserva)
                if(reserva !== null){
                    res.status(200).json(reserva)
                }else{
                    res.status(404).send({msg: "Reserva no encontrada"})
                }                
            } catch(error) {
                next(error)
            }
        })

        // Recibe el id del hotel por parametro para buscar el template y el mail del huesped por el body.
        router.post('/:idHotel/email/enviar', async (req, res, next) => {
            try {
                var hotel = this.servHoteles.buscarPorId(req.params.idHotel)
                var config = configMailer.infoTemplate
                config.dirEmailBody = hotel.template
                var mailer = crearMailer(config)  
                await mailer.send(req.body.email, recipeList)
                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }
        });
       
        router.post('/user/validacion', async (req, res, next) => {
            try {
                const cod_reserva = req.query.cod_reservation;
                const nombre  = req.query.name;
                const apellido = req.query.last_name;

                const reserva = this.servReservas.reservasManager.getByCode(cod_reserva);
                const usuario = this.servHuespedes.huespedesManager.getById(reserva.huesped);

                if(usuario != null && usuario.nombre == nombre && usuario.apellido == apellido) {
                    res.status(200).send({'msg': 'Exito'});
                }
                res.status(400),send({'msg': 'No encontrado'});
            } catch(error) {
                res.status(500),send({'msg': 'Error servidor'});
                next(error)
            }            
        });

        router.put('/actualizar/usuario',async (req, res, next) =>{
            try {
                const usuario_id = req.params.id;
                const nombre = req.query.name;
                const apellido  = req.query.last_name;
                const tipo_documento = req.query.document_type;
                const documento = req.query.document;
                const email = req.query.email;
                const foto_perfil = req.query.profile_picture;

                let usuario = {}
                usuario.id = usuario_id
                usuario.nombre = nombre
                usuario.apellido = apellido
                usuario.tipo_documento = tipo_documento
                usuario.documento = documento
                usuario.email = email
                usuario.foto_perfil = foto_perfil

                const respuesta = await this.servHuespedes.huespedesManager.updateById(usuario)

                if(respuesta.update != 1){
                    res.status(400)
                }
                
                res.status(200)

            } catch(error) {
                res.status(500).send({'msg': 'Error Servidor'})
                next(error)
            }         
        })

        router.delete('/borrar/user',async (req, res, next) =>{
            try {
                const id = req.params.user_id;

                this.servHuespedes.huespedesManager.delete(id);     
                res.status(200)
            } catch(error) {
                res.status(500).send({'msg': 'Error Servidor'})
                next(error)
            }         
        })

        // Recibe el codigo de reserva y el numero de habitacion por parametro y actualiza la reserva 
        router.put('/:codReserva/actualizar/:numHabitacion',async (req, res, next) =>{
            try {
                await this.servHoteles.actualizarReserva(req.params.codReserva,null,req.params.numHabitacion)
                res.status(201).send({msg: "Habitacion actualizada exitosamente"})
            } catch(error) {
                next(error)
            }         
        })

        return router
    }
}

export default Router
