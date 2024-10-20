const { Router } = require('express')
const productosController = require('../controllers/productos.controller')
const { productosMiddleware } = require('../middlewares')
const schemaValidator = require('../middlewares/schemaValidator')
const {productosSchema} = require('../schemas/productos.schema')
const {fabricanteSchema,fabricantesArraySchema} = require('../schemas/fabricantes.schema')
const {componenteSchema,componentesArraySchema} = require('../schemas/componentes.schema')

const route = Router()

route.get('/productos', productosController.getAllProductos)

route.get('/productos/:id',
    productosMiddleware.validateIdProducto,
    productosController.getProductoById
)

route.post('/productos',
    schemaValidator(productosSchema), 
    productosController.createProducto
)

route.put('/productos/:id',productosMiddleware.validateIdProducto, productosController.updateProducto)

route.delete('/productos/:id', productosController.deleteProductoById)

route.get('/productos/:id/fabricantes', productosMiddleware.validateIdProducto, productosController.getProductoWhitAllFabricantes)

route.post('/productos/:id/fabricantes',
    productosMiddleware.validateIdProducto,
    schemaValidator(fabricantesArraySchema), 
    productosController.addFabricantesToProducto)

route.get('/productos/:id/componentes', productosMiddleware.validateIdProducto, productosController.getProductoWhitAllComponents)

route.post('/productos/:id/componentes',
    productosMiddleware.validateIdProducto,
    schemaValidator(componentesArraySchema), 
    productosController.addComponentesToProducto)

route.get('/productos/:minPrecio/:maxPrecio',productosMiddleware.validarPrecios, productosController.filterProductoMinMaxPrecio)

route.put('/productos/:productoId/fabricantes/:fabricanteId', productosController.addFabricanteToProductoById)

route.put('/productos/:productoId/componentes/:componenteId', productosController.addComponenteToProductoById)

module.exports = route