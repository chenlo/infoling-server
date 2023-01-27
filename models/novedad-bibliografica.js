import mongoose from 'mongoose'
const { Schema } = mongoose

const novedadBibliograficaSchema = new Schema({
    autores: [
        {
            primerApellido: {
                type: String,
                required: true
            },
            segundoApellido: {
                type: String
            },
            nombre: {
                type: String,
                required: true
            },
            tipo: {
                type: String,
                default: "autor",
                required: true
            }
        }
    ],
    formatos: [
        {
            formato: {
                type: String,
                required: true
            },
            isbn13: {
                type: String,
                unique: true
            },
            isbn10: {
                type: String,
                unique: true
            },
            numPag: {
                type: Number,
                required: true
            },
            urlCompraElectronica: {
                type: String,
                required: true
            },
            precioEur: {
                type: Number,
                required: true
            },
            precioUsa: {
                type: Number
            },
        }
    ],
    titulo: {
        type: String,
        required: true,
        unique: true
    },
    subtitulo: {
        type: String
    },
    lugarEdicion: {
        type: String,
        required: true
    },
    anno: {
        type: Number,
        default: 2023
    },
    editorial: {
        type: String,
        required: true
    },
    coleccion: {
        type: String
    },
    url: {
        type: String
    },
    descripcion: {
        type: String,
        required: true
    },
    indice: {
        type: String,
        required: true
    },
    validated: {
        type: Boolean,
        default: 0
    },
    ejemplarEnviado: {
        type: Boolean,
        default: 0
    },
    urlPublicacion: {
        type: String
    },
    tematicas: [ { type: String } ]
}, 
{ timestamps: true }    
)

export default mongoose.model("NovedadBibliografica", novedadBibliograficaSchema, 'novedadBibliografica')
