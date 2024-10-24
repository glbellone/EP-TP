const { Router } = require('express')
const fabricantesController = require('../controllers/fabricantes.controller')
const { fabricantesMiddleware } = require('../middlewares')
const schemaValidator = require('../middlewares/schemaValidator')
const {fabricanteSchema} = require('../schemas/fabricantes.schema')

const route = Router()

route.get('/fabricantes', fabricantesController.getAllFabricantes)

route.get('/fabricantes/:fabricanteId', fabricantesMiddleware.validateIdFabricante, fabricantesController.getFabricanteById )

route.post('/fabricantes',
            schemaValidator(fabricanteSchema), 
            fabricantesController.createFabricante)

route.put('/fabricantes/:fabricanteId', fabricantesMiddleware.validateIdFabricante, fabricantesController.updateFabricante)

route.delete('/fabricantes/:fabricanteId', fabricantesMiddleware.validateIdFabricante, fabricantesController.deleteFabricanteById)

route.get('/fabricantes/:fabricanteId/productos', fabricantesMiddleware.validateIdFabricante, fabricantesController.getFabricanteWhitAllProducts)

module.exports = route