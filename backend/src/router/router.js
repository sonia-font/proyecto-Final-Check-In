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

        router.post('/crear/empleado', async(req, res, next) => {
            try {
                await this.servEmpleados.empleadosManager.add(req.body)
                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }
        });
        
        router.post('/crear/huesped', async(req, res, next) => {
            try {
                await this.servHuespedes.huespedesManager.add(req.body)
                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }
        });

        router.post('/crear/reservation', async(req, res, next) => {
            try {
                await this.servReservas.reservasManager.add(req.body)
                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }
        });

        router.post('/crear/hotel', async(req, res, next) => {
            try {
                await this.servHoteles.hotelesManager.add(req.body)
                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }
        });

        router.post('/huesped/guardar/foto', async(req, res, next) => {

        })

        router.get('/huesped/obtener/:reservaId', async(req, res, next) => {
            try {
                const reservaId = req.params.reservaId;
                const reserva = await this.servReservas.getByCode(reservaId);

                res.status(200).send(reserva.huesped);
            } catch(error) {
                next(error)
            }
        })

        router.post('/email/enviar', async (req, res, next) => {
            try {
                const usuario_id = req.params.user_id;
            
                const template  = req.query.template;
                const cod_reserva = req.query.cod_reservation;

                //busca el template le pasa el codigo dfe reserva
                //luego manda el template con el servicio de mail

                res.status(200).send({msg: "Enviado"})
            } catch(error) {
                next(error)
            }
        });


        router.post('/email/enviar/info', async (req, res, next) => {
            try {
                const usuario_id = req.params.user_id;
            
                const template  = req.query.template;
                const room = req.query.room;

                //busca el template le pasa el codigo dfe reserva
                //luego manda el template con el servicio de mail

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

        router.put('/actualizar/reserva/:codigo',async (req, res, next) =>{
            try {
                const codigo = req.params.codigo;
                const reserva = this.servReservas.getByCode(codigo);

                if(reserva != null) {
                    reserva.codigo = codigo 
                    reserva.habitacion = req.query.room != "" ? req.query.room : reserva.habitacion;
                   
                    const respuesta = await this.servReservas.updateById(huesped);

                    if(respuesta == 1){
                        res.status(200)
                    }
                }
                res.status(400)
            } catch(error) {
                next(error)
            }         
        })

        return router
    }
}

export default Router
