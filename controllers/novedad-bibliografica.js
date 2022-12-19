import NovedadBibliografica from "../models/novedad-bibliografica"

export const save = async (req, res) => {
    try {
        console.log(req.body)
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

        // Validamos campos
        if (!titulo) return res.status(400).send("El título de la obra es obligatorio")
        let tituloExists = await NovedadBibliografica.findOne({titulo}).exec()
        if (tituloExists) return res.status(400).send("Ya existe una novedad con ese mismo título")

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
        await novedad.save()
        console.log("Novedad bibliográfica guardada")
        return res.status(200).json({ok: true})

    } catch (err) {
        console.log(err)
        return res.status(400).send('Error al registrar la novedad bibliográfica.')
    }
}