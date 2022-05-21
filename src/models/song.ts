import {model, Schema, Document} from 'mongoose';
import validator from 'validator';
import { isInteger, regExp } from '../functions/validateFunctions';

/**
 * @typeParam name String con el nombre de la canción
 * @typeParam author String con el nombre el autor
 * @typeParam duration Number con la duración de la canción
 * @typeParam genres Array con los géneros de la canción
 * @typeParam single Boolean para indicar si es un single o no
 * @typeParam numberReproductions Number con el número de reproducciones
 * @description Interfaz SongDocumentInterface que hereda de Document
 */
interface SongDocumentInterface extends Document {
    name: string,
    author: string,
    duration: number,
    genres: string[],
    single: boolean,
    numberReproductions: number
}

/**
 * @description Esquema SongSchema usando como argumento de tipo SongDocumentInterface
 */
const SongSchema = new Schema<SongDocumentInterface>({
    name: {
        type: String,
        required: true,
        trime: true,
        validate: (value: string) => {
            if (!value.match(regExp)) {
                throw new Error('The name of the song must be a combination of printable ascii characters or characters within the Spanish language');
            }            
        }
    },
    author: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: (value: string) => {
            if (!value.match(regExp)) {
                throw new Error('The name of the author must be a combination of printable ascii characters or characters within the Spanish language');
            }            
        }
    },
    duration: {
        type: Number,
        required: true,
        min: 0.0,
        default: 0.0,
        validate: (value: number) => {
            if (isInteger(value)) {
                throw new Error('Duration must be a float number');
            }
        }
    },
    genres: [{
        type: String,
        required: true,
        trim: true,
        validate: (value: string) => {
            if (!value.match(regExp)) {
                throw new Error('The name of the genre must be a combination of printable ascii characters or characters within the Spanish language');
            }            
        }
    }],
    single: {
        type: Boolean,
        required: true,
    },
    numberReproductions: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
});
  
/**
 * @description Modelo Song usando como argumento de tipo SongSchema
 */
export const Song = model('Song', SongSchema);
