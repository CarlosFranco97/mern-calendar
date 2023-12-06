
/* 
    Event Routes
    HOST + /api/events
*/

//Funcion que me permite generar el router
const {Router, application} = require('express'); 
const router = Router()
const { check } = require('express-validator') 
const {validarCampos} = require('../middlewares/validar-campos')
//Helper para validar las fechas de inicio y finalizacion
const {isDate} = require('../helpers/isDate')
//Middleware
const {validarJWT} = require('../middlewares/validar-jwt')
//Importando Controllers
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')

//Validar el JWT
router.use(validarJWT)

//Obtener eventos
router.get('/', getEventos) 

//Crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El titulo debe de ser obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatorio').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
        
    ],
crearEvento)

//Actualizar Evento
router.put('/:id', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    check('id','Id is not valid').isMongoId(),
    validarCampos
    ], 
actualizarEvento)

//Borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router;