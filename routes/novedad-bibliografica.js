import express from 'express';

const router = express.Router();
const multer = require("multer");

import { save, saveImagenes, validate } from '../controllers/novedad-bibliografica'

const { novedadBibliograficaValidationRules, validateNovedadBibliografica } = require('../validators/novedad-bibliografica')

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "/uploads/novedad-bibliografica")
        },
        filename: (req, file, cb) => {
            cb(
                null,
                file.originalname
            )
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error("Sólo es posible subir archivos jpeg o png"))
        }
    }
})

router.post(
    "/novedad-bibliografica",
    save
)

router.post(
    "/novedad-bibliografica/imagenes",
    upload.single('imagenes'),
    saveImagenes
)

/novedad-bibliografica/imagenes

router.post(
    "/validate/novedad-bibliografica", 
    novedadBibliograficaValidationRules(), 
    validateNovedadBibliografica, 
    validate
)

module.exports = router;
