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
        });

        router.post('/huesped/guardar/foto', async(req, res, next) => {

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
       
        router.post('/huesped/validacion', async (req, res, next) => {
            try {
                const cod_reserva = req.body.cod_reservation;
                const nombre  = req.body.name;
                const apellido = req.body.last_name;

                const reserva = await this.servReservas.getByCode(cod_reserva);
                
                if(reserva != null && reserva.huesped.nombre == nombre && reserva.huesped.apellido == apellido) {
                    res.status(200).send({'msg': 'Exito'});
                }
                res.status(400).send({'msg': 'No encontrado'});
            } catch(error) {
                res.status(500).send({'msg': 'Error servidor'});
                next(error)
            }            
        });

        router.put('/actualizar/huesped/:id',async (req, res, next) =>{
            try {
                
                const huespedId = req.params.id;
                const huesped = await this.servHuespedes.getById(huespedId);

                if(huesped != null) {
                    huesped.id = huespedId;
                    huesped.nombre = req.body.name ? req.body.name : huesped.nombre;
                    huesped.apellido  = req.body.last_name ? req.body.last_name : huesped.apellido;
                    huesped.email = req.body.email ? req.body.email : huesped.email;
                    
                    //faltan en bbdd
                    // huesped.foto_perfil = req.query.profile_picture != "" ? req.query.profile_picture : huesped.profile_picture ;
                    // huesped.tipo_documento = req.query.document_type != "" ? req.query.document_type : huesped.document_type ;
                    // huesped.documento = req.query.document != "" ? req.query.document : huesped.document ;

                    const respuesta = await this.servHuespedes.updateById(huesped)
                    // se tiene que actualizar el huesped de la reserva
               
                    if(respuesta){
                        res.status(200).send({"msg": "actualizado"})
                    }else{
                        res.status(400).send({"msg": "error"})
                    }
                }
                
            } catch(error) {
                res.status(500).send({'msg': 'Error Servidor'})
                next(error)
            }         
        })

        router.delete('/borrar/huesped/:id',async (req, res, next) =>{
            try {
                const id = req.params.id;
                const respuesta = await this.servHuespedes.deleteById(id); 
                if(respuesta) {
                    res.status(200).send({"msg": "borrado con exito"})
                } else {
                    res.status(400).send({"msg": "error"})
                }
                
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
