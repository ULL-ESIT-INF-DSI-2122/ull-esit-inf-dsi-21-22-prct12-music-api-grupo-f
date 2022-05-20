import {model, Schema, Document} from 'mongoose';
import validator from 'validator';
import { isInteger, regExp } from '../functions/validateFunctions';

interface SongDocumentInterface extends Document {
    name: string,
    author: string,
    duration: number,
    genres: string[],
    single: boolean,
    numberReproductions: number
}

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
  
export const Song = model('Song', SongSchema);
