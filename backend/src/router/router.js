import express from 'express'
import ServicioEmpleados from '../negocio/servicios/servicioEmpleados.js'
import ServicioHoteles from '../negocio/servicios/servicioHoteles.js'
import ServicioHuespedes from '../negocio/servicios/servicioHuespedes.js'
import ServicioReservas from '../negocio/servicios/servicioReservas.js'


class Router {

    constructor(){
        this.servicioEmpleados = new ServicioEmpleados()
        this.servicioHoteles = new ServicioHoteles()
        this.servicioHuespedes = new ServicioHuespedes()
        this.servicioReservas = new ServicioReservas()
    }

    createRouter(){
        const router = express.Router()

        // recipeRouter.get('/recipes', async (req, res, next) => {
        //     try {
        //         const recipes = await (await cuGetRecipes).getRecipes()
        //         res.json(recipes)
        //     } catch(error) {
        //         next(error)
        //     }            
        // });

        // recipeRouter.post('/recipes/upload', async (req, res, next) => {
        //     try {
        //         (await cuUploadRecipe).upload(req)
        //         res.status(201).send({msg: 'Recipe Uploaded!'})
        //     } catch(error) {
        //         next(error)
        //     }
        // });

        // recipeRouter.post('/recipes/:idUser/weekPlan',async (req, res, next) =>{
        //     try {
        //         await (await cuGetWeekPlan).list({
        //             idUser: req.params.idUser,
        //             keyWord: req.query.keyWord,
        //             maxIngredients: req.query.maxIngredients,
        //             maxTime: req.query.maxTime,
        //             difficulty: req.query.difficulty
        //         })
        //         res.status(200).send({msg: "Enviado"})
        //     } catch(error) {
        //         next(error)
        //     }         
        // })

        // recipeRouter.use((error, req, res, next) => {
        //     if (error.type == 'ERROR_INVALID_ID'){
        //         res.status(400)            
        //     }else if (error.type == 'ERROR_INVALID_SEND_FORMAT'){
        //         res.status(400)            
        //     }else if (error.type == 'BAD_REQUEST'){
        //         res.status(400)            
        //     }else if(error.type == 'ERROR_USER_NOT_FOUND'){
        //         res.status(404)
        //     }else{
        //         res.status(500)
        //     }
        //     res.json({message:error.message})
        // })
    
        return router
    }
}

export default Router
