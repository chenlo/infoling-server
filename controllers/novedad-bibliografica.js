import NovedadBibliografica from "../models/novedad-bibliografica"
import { validISBN } from "../utils/utils"

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

        // Validamos datos de los autores
        if (autores.length===0) {
            return res.status(400).send("Debe indicar algún autor")
        } else if (autores.length>0) {
            const autorMinimo = autores[0]
            if (!autorMinimo.nombre || !autorMinimo.primerApellido || !autorMinimo.tipo)
                return res.status(400).send("Faltan datos obligatorios del autor") 
        }
        // Validamos datos de la obra
        if (!titulo) 
            return res.status(400).send("El título de la obra es obligatorio")
        else if (!editorial) 
            return res.status(400).send("El nombre de la editorial es obligatorio")
        else if (!anno) 
            return res.status(400).send("El año de publicación es obligatorio")
        else if (!lugarEdicion) 
            return res.status(400).send("El lugar de edición es obligatorio")
        // Validamos temática        
        if (tematicas.length===0) {
            return res.status(400).send("Debe indicar alguna temática de la obra")
        }
        // Validamos formato de edicion
        if (formatos.length===0) {
            return res.status(400).send("Debe indicar algún formato de publicación de la obra")
        } else if (formatos.length>0) {
            const primerFormato = formatos[0]
            if (!primerFormato.isbn13 && !primerFormato.isbn10) {
                return res.status(400).send("Debe indicar el ISBN-13 o el ISBN-10") 
            } else if (!validISBN(primerFormato.isbn13, "ISBN-13")) {
                return res.status(400).send("El formato del ISBN-13 no es correcto") 
            } else if (!validISBN(primerFormato.isbn10, "ISBN-10")) {
                return res.status(400).send("El formato del ISBN-10 no es correcto") 
            } else if (!primerFormato.formato) {
                return res.status(400).send("Debe indicar el tipo de formato")
            } else if (!primerFormato.numPag) {
                return res.status(400).send("Debe indicar el número de páginas")
            } else if (!primerFormato.precioEur && !primerFormato.precioUsa) {  
                return res.status(400).send("Debe indicar al menos uno de los precios")
            }
        }
        // Validamos descripción
        if (!descripcion) 
            return res.status(400).send("La descripción de la obra es obligatoria")
        // Validamos descripción
        if (!indice) 
            return res.status(400).send("El índice de la obra es obligatorio")
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