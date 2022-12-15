import mongoose from 'mongoose'
const { Schema } = mongoose

const novedadBibliograficaSchema = new Schema({
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
        default: 2022
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
        type: String
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
    }
}, 
{ timestamps: true }    
)

export default mongoose.model("NovedadBibliografica", novedadBibliograficaSchema, 'novedadBibliografica')
