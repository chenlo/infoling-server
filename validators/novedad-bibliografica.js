const { body, check, validationResult } = require('express-validator')
validator = require('validator');

const novedadBibliograficaValidationRules = () => {
   
  return [
    /// Datos de los autores/as
    body('autores')
      .isArray({ min: 1, max: 8 })
      .withMessage("Debe indicar algún autor"),
    body('autores.*.nombre')
      .notEmpty()
      .withMessage("El nombre de los autores es obligatorio"),
    body('autores.*.primerApellido')
      .notEmpty()
      .withMessage("El primer apellido de los autores es obligatorio"),
    body('autores.*.tipo')
      .notEmpty()
      .withMessage("El rol de los autores es obligatorio"),
    /// Datos de la obra
    body('titulo')
      .notEmpty()
      .withMessage("El título de la obra es obligatorio"),
    body('lugarEdicion')
      .notEmpty()
      .withMessage("El lugar de edición es obligatorio"),
    body('editorial')
      .notEmpty()
      .withMessage("El nombre de la editorial es obligatorio"),
    body('anno')
      .notEmpty()
      .withMessage("El año de publicación es obligatorio")
      .isNumeric()
      .withMessage("El año de publicación debe ser un número"),
    body('url')
      .if(body('url').notEmpty())
      .isURL()
      .withMessage("La URL de acceso abierto al libro no es correcta"),
    /// Temática
    body('tematicas')
      .isArray({ min: 1 })
      .withMessage("Debe indicar alguna temática de la obra"),
    /// Formatos de edición
    body('formatos')
      .isArray({ min: 1, max: 2 })
      .withMessage("Debe indicar algún formato de publicación de la obra"),
    body('formatos.*.isbn13')
      .if(body('formatos.*.isbn10').isEmpty())
      .notEmpty()
      .withMessage("Debe indicar el ISBN-13 si no rellena el ISBN-10"),
    body('formatos.*.isbn13')
      .if(body('formatos.*.isbn13').notEmpty())  
      .isISBN()
      .withMessage("El formato del ISBN-13 no es válido"),
    body('formatos.*.isbn10')
      .if(body('formatos.*.isbn13').isEmpty())
      .notEmpty()
      .withMessage("Debe indicar el ISBN-10 si no rellena el ISBN-13"),
    body('formatos.*.isbn10')
      .if(body('formatos.*.isbn10').notEmpty())  
      .isISBN()
      .withMessage("El formato del ISBN-10 no es válido"),
    body('formatos.*.formato')
      .notEmpty()
      .withMessage("El formato de la obra es obligatorio"),
    body('formatos.*.numPag')
      .notEmpty()
      .withMessage("El número de páginas de la obra es obligatorio"),
    body('formatos.*.urlCompraElectronica')
      .isURL()
      .withMessage("La URL de compra electrónica del libro no es correcta"),
    body('formatos.*.precioEur')
      .if(body('formatos.*.precioUsa').isEmpty())
      .notEmpty()
      .withMessage("Debe indicar el precio en euros si no rellena el precio en dólares"),
    body('formatos.*.precioUsa')
      .if(body('formatos.*.precioEur').isEmpty())
      .notEmpty()
      .withMessage("Debe indicar el precio en dólares si no rellena el precio en euros"),
    body('descripcion')
      .custom((value) => {
        return value!=="<p></p>";
      })
      .withMessage("La descripción es obligatoria"),
    body('indice')
      .custom((value) => {
        return value!=="<p></p>";
      })
      .withMessage("El índice es obligatorio"),
    body('imagenes')
      .notEmpty()
      .withMessage("La imagen es obligatoria"),
  ]
}

const validateNovedadBibliografica = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log("Hay errores en el formulario de Novedades Bibliográficas: ", errors.array())
      return res.status(422).json({
          errors: errors.array()
      });
  } else {
      console.log("No hay errores en el formulario de Novedades Bibliográficas")
      return res.status(201).json({
        errors: null
      });     
  }
}

module.exports = {
    novedadBibliograficaValidationRules,
    validateNovedadBibliografica,
}