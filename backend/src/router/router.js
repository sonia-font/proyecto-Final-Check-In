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

        this.servHuespedes.popularBD()
        this.servEmpleados.popularBD()
        this.servReservas.popularBD(this.servHuespedes)
        this.servHoteles.popularBD(this.servEmpleados,this.servReservas)
    }

    createRouter(){
        const router = express.Router()


        router.post('/crear/reserva', async(req, res, next) => {

        })

        router.post('/usuario/guardar/foto', async(req, res, next) => {

        })

        router.get('/usuario/obtener/{reserva_id}', async(req, res, next) => {

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
