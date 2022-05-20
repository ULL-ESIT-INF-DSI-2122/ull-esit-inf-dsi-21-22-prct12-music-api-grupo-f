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
        validate: (value: string) => {
            if (!value.match(/^[A-Za-z0-0\s]+$/g)) {
                throw new Error('The song name must be a combination of letters, numbers or spaces.');
            }            
        }
    },
    author: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: (value: string) => {
            if (!value.match(/^[A-Za-z0-0\s]+$/g)) {
                throw new Error('The author name must be a combination of letters, numbers or spaces.');
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
            if (!value.match(/^[A-Za-z0-0\s]+$/g)) {
                throw new Error('The genre name must be a combination of letters, numbers or spaces.');
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
