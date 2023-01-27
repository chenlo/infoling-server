const fs = require('file-system')
import NovedadBibliografica from "../models/novedad-bibliografica"

export const validate = async (req, res) => {
    try {
        console.log('Validando ', req.body.titulo)
        console.log(req.body)
    } catch (err) {
        console.log(err)
        return res.status(400).send('Error al registrar la novedad bibliográfica.')
    }
}

export const save = async (req, res) => {
    try {
        const { 
            autores,
            titulo,
            subtitulo,
            anno,
            lugarEdicion,
            editorial,
            coleccion,
            url,
            tematicas,
            formatos,
            indice,
            descripcion
        } = req.body
        // Guardar
        const novedad = new NovedadBibliografica({
            autores,
            titulo,
            subtitulo,
            anno,
            lugarEdicion,
            editorial,
            coleccion,
            url,
            tematicas,
            formatos,
            indice,
            descripcion
        })
        console.log("Guardando novedad bibliográfica: ", novedad)
        await novedad.save()
        console.log("Novedad bibliográfica guardada: ", novedad)
        return res.status(200).json({ok: true, id: novedad._id})
    } catch (err) {
        console.log(err)
        return res.status(400).send('Error al guardar la novedad bibliográfica')
    }
}

export const saveImagenes = async (req, res) => {
    try {
        const { 
            idNovedadBibliografica,
            imagenes
        } = req.body
        console.log("Guardando la imagen de la novedad bibliográfica")
        console.log(idNovedadBibliografica)
        console.log(imagenes)
        return res.status(200).json({ok: true})
    } catch (err) {
        console.log(err)
        return res.status(400).send('Error al guardar la imagen de la novedad bibliográfica')
    }
}