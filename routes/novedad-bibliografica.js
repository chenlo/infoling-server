import express from 'express';

const router = express.Router();

import { save, validate } from '../controllers/novedad-bibliografica'

const { novedadBibliograficaValidationRules, validateNovedadBibliografica } = require('../validators/novedad-bibliografica')

router.post("/novedad-bibliografica", save)

router.post(
    "/validate/novedad-bibliografica", 
    novedadBibliograficaValidationRules(), 
    validateNovedadBibliografica, 
    validate
)

module.exports = router;
