import { ObjectID } from 'mongodb';
import {model, Schema, Document} from 'mongoose';
import validator from 'validator';
import { isInteger } from '../functions/validateFunctions';

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
        /*
        validate: (value: string) => {
            if (!validator.) {
                throw new Error('Song name must contain alphanumeric characters only');
            }
        }
        */
    },
    author: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        /*
        validate: (value: string) => {
            if (!validator.isAlphanumeric(value)) {
                throw new Error('Auhtor name must contain alphanumeric characters only');
            }
        }
        */
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
        /*
        validate: (value: string) => {
            if (!validator.isAlphanumeric(value)) {
                throw new Error('Genre name must contain alphanumeric characters only');
            }
        }
        */
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
