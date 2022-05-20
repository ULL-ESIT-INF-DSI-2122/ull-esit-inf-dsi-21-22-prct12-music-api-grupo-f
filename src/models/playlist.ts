import {model, Schema, Document} from 'mongoose';
import validator from 'validator';
import { isInteger } from '../functions/validateFunctions';

interface PlaylistDocumentInterface extends Document {
    name: string,
    songs: string[]
    duration: number,
    genres: string[],
}

const PlaylistSchema = new Schema<PlaylistDocumentInterface>({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        validate: (value: string) => {
            if (!value.match(/^[A-Za-z0-0\s]+$/g)) {
                throw new Error('The playlist name must be a combination of letters, numbers or spaces.');
            }            
        }
    },
    songs: [{
        type: String,
        required: true,
        trim: true,
        validate: (value: string) => {
            if (!value.match(/^[A-Za-z0-0\s]+$/g)) {
                throw new Error('The song name must be a combination of letters, numbers or spaces.');
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
            if (!value.match(/^[A-Za-z0-0\s]+$/g)) {
                throw new Error('The genre name must be a combination of letters, numbers or spaces.');
            }            
        }
    }],
});
  
export const Playlist = model('Playlist', PlaylistSchema);
