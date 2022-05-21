import {model, Schema, Document} from 'mongoose';
import validator from 'validator';
import { isInteger, regExp } from '../functions/validateFunctions';

/**
 * @typeParam name String con el nombre de la playlist
 * @typeParam songs Array con los nombres de las canciones de la playlist
 * @typeParam duration Number con la duración de la playlist
 * @typeParam genres Array con los géneros de la playlist
 * @description Interfaz PlaylistDocumentInterface que hereda de Document
 */
interface PlaylistDocumentInterface extends Document {
    name: string,
    songs: string[]
    duration: number,
    genres: string[],
}

/**
 * @description Esquema PlaylistSchema usando como argumento de tipo PlaylistDocumentInterface
 */
const PlaylistSchema = new Schema<PlaylistDocumentInterface>({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        validate: (value: string) => {
            if (!value.match(regExp)) {
                throw new Error('The name of the playlist must be a combination of printable ascii characters or characters within the Spanish language');
            }            
        }
    },
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
});
 
/**
 * @description Modelo Playlist usando como argumento de tipo PlaylistSchema
 */
export const Playlist = model('Playlist', PlaylistSchema);
