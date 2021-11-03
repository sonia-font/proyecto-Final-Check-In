import express from 'express'
import Reserva from '../negocio/modelos/reserva.js'
import ServicioEmpleados from '../servicios/servicioEmpleados.js'
import ServicioHoteles from '../servicios/servicioHoteles.js'
import ServicioHuespedes from '../servicios/servicioHuespedes.js'
import ServicioReservas from '../servicios/servicioReservas.js'


class Router {

    constructor(){
        this.servEmpleados = new ServicioEmpleados()
        this.servHuespedes = new ServicioHuespedes()
        this.servReservas = new ServicioReservas()
        this.servHoteles = new ServicioHoteles()
    }

    createRouter(){
        const router = express.Router()

        //S: En capa servicios falta metodo que agregue al empleado para no llamar directo al manager
        router.post('/crear/empleado', async(req, res, next) => {
            try {
                await this.servEmpleados.empleadosManager.add(req.body)
                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }
        });
        
        //S: En capa servicios falta metodo que agregue al huesped para no llamar directo al manager
        router.post('/crear/huesped', async(req, res, next) => {
            try {
                await this.servHuespedes.huespedesManager.add(req.body)
                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }
        });

        //S: En capa servicios falta metodo que agregue la reserva para no llamar directo al manager
        router.post('/crear/reserva', async(req, res, next) => {
            try {
                await this.servReservas.reservasManager.add(req.body)
                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }
        });

        //S: En capa servicios falta metodo que agregue al hotel para no llamar directo al manager
        router.post('/crear/hotel', async(req, res, next) => {
            try {
                await this.servHoteles.hotelesManager.add(req.body)
                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }
        });

        //S: En capa de servicio usar caso de uso sonia para subir un archivo
        router.post('/usuario/guardar/foto', async(req, res, next) => {
            //guarda el archivo en el server
            //guarda la direccion en el heusped para su foto
        })

        //G: En capa servicio para el caso de uso del empleado del hotel para pedir los datos del huesped
        router.get('/usuario/obtener/{reserva_id}', async(req, res, next) => {
            //busca por id de reserva y cruza con la tabla de heuspedes para levantar los datos
        })

        //S: En el helper de mails caso de uso mail con codigo de reserva, lo va a usar el cron
        //Esta punta aca solo sirve para pruebas
        router.post('/email/enviar', async (req, res, next) => {
            try {
                const usuario_id = req.params.user_id;
            
                const template  = req.query.template;
                const cod_reserva = req.query.cod_reservation;
                //tiene que tener el mail y nombre del huesped
                //busca el template de la aplicacion de checkin (unico, hardcodeado) le pasa el codigo de reserva,  mail y nombre del huesped
                //luego manda el template con el servicio de mail

                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }
        });


        //S: Lo triggerea el empleado cuando carga la habitacion
        //En el helper de mails caso de uso info del hotel
        router.post('/email/enviar/info', async (req, res, next) => {
            try {
                const usuario_id = req.params.user_id;
            
                const template  = req.query.template;
                const room = req.query.room;

                //busca el template propio del hotel, lo tiene en BD
                //necesita el nombre y mail del huesped y la habitacion de la reserva
                //luego manda el template con el servicio de mail

                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }
        });
       
        //G: Caso de uso validacion cuando el usuario carga num de reserva, nombre y apellido
        //Agregar servicio para no usar directo el manager
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

        //G: Caso de uso agrega foto el usuario, esto podria ser un servicio que se llama despues de subir la foto
        // y que la punta quede de prueba
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

        //G: Caso de uso, se termino la reserva. Se borran los datos personales del usuario pero se guarda la reserva para el grafana
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

        //G: Caso de uso empleado agrega habitacion a la reserva. ((despues de esto manda el mail))
        //Tambien es el caso de uso de los cambios de estado de la reserva. Ej. 
        router.put('/actualizar/reserva',async (req, res, next) =>{
            try {
                const cod_reserva = req.query.cod_reservation;
                const habitacion  = req.query.room;
                
                let reserva = {}
                reserva.codigo = cod_reserva
                reserva.habitacion = habitacion
                
                const respuesta = await this.servReservas.reservasManager.updateById(reserva);

                if(respuesta.update != 1){
                    res.status(400)
                }
                
                res.status(200)
            } catch(error) {
                next(error)
            }         
        })

        return router
    }
}

export default Router
