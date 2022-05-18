import { ObjectID } from 'mongodb';
import {model, Schema, Document} from 'mongoose';
import validator from 'validator';

interface PlaylistDocumentInterface extends Document {
    name: string,
    songs: string[]
    duration: number,
    genres: string[],
}

const PlaylistSchema = new Schema<PlaylistDocumentInterface>({
    name: {
        type: String,
        required: true,
        validate: (value: string) => {
            if (!validator.isAlphanumeric(value)) {
                throw new Error('Playlist name must contain alphanumeric characters only');
            }
        }
    },
    songs: [{
        type: String,
        required: true,
        validate: (value: string) => {
            if (!validator.isAlphanumeric(value)) {
                throw new Error('Song name must contain alphanumeric characters only');
            }
        }
    }],
    duration: {
        type: Number,
        required: true,
    },
    genres: [{
        type: String,
        required: true,
        validate: (value: string) => {
            if (!validator.isAlphanumeric(value)) {
                throw new Error('Genre name must contain alphanumeric characters only');
            }
        }
    }],
});
  
export const Playlist = model('Playlist', PlaylistSchema);
