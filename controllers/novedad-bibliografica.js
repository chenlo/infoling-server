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
            descripcion,
            imagenes
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
            descripcion,
            imagenes
        })
        console.log("Saving: ", novedad)
        await novedad.save()
        console.log("Novedad bibliográfica guardada")
        return res.status(200).json({ok: true})
    } catch (err) {
        console.log(err)
        return res.status(400).send('Error al guardar la novedad bibliográfica')
    }
}