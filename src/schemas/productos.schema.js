const Joi = require('joi')

const productosSchema = Joi.object().keys(
    {
        nombre: Joi.string().required().min(3).max(255).messages( {
            "any.required":"El nombre es requerido",
            "string.min": "El nombre debe tener como mínimo {#limit} caracteres",
            "string.max": "El nombre debe tener como máximo {#limit} caracteres",
            "string.empty": "El nombre no puede ser vacio"
        }),
        descripcion: Joi.string().allow("").optional(),
        precio: Joi.number().required().min(0).messages( {
            "any.required":"El precio es requerido",
            "number.min": "El precio debe tener como mínimo {#limit} caracteres",
            "number.base": "El precio debe ser un numero valido"
        }),
        pathImg: Joi.string().allow("").optional()
    }
).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})
const productosArraySchema = Joi.array().items(productosSchema).min(1).messages({
    'array.min': 'Debes enviar al menos un producto',
  });

module.exports = {productosSchema, productosArraySchema}