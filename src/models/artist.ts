import {model, Schema, Document} from 'mongoose';
import validator from 'validator';
import { regExp } from '../functions/validateFunctions';

/**
 * @typeParam name String con el nombre del artista
 * @typeParam genres Array de strings con los géneros del artista
 * @typeParam monthlyListeners Number con el número de oyentes mensuales
 * @typeParam songs Array de strings con las canciones del artista
 * @description Interfaz ArtistDocumentInterface que hereda de Document
 */
interface ArtistDocumentInterface extends Document {
    name: string,
    genres: string[],
    monthlyListeners: number,
    songs: string[]
}

/**
 * @description Esquema ArtistSchema usando como argumento de tipo ArtistDocumentInterface
 */
const ArtistSchema = new Schema<ArtistDocumentInterface>({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: (value: string) => {
            if (!value.match(regExp)) {
                throw new Error('The name of the artist must be a combination of printable ascii characters or characters within the Spanish language');
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
    songs: [{
        type: String,
        required: true,
        trim: true,
        validate: (value: string) => {
            if (!value.match(regExp)) {
                throw new Error('The name of the song must be a combination of printable ascii characters or characters within the Spanish language');
            }            
        }
    }],
    monthlyListeners: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
});

/**
 * @description Modelo Artist usando como argumento de tipo ArtistSchema
 */
export const Artist = model('Artist', ArtistSchema);
