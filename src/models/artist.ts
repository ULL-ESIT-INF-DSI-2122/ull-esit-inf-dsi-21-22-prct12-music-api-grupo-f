import { ObjectID } from 'mongodb';
import {model, Schema, Document} from 'mongoose';
import validator from 'validator';

interface ArtistDocumentInterface extends Document {
    name: string,
    genres: string[],
    monthlyListeners: number,
    songs: string[]
}

const ArtistSchema = new Schema<ArtistDocumentInterface>({
    name: {
        type: String,
        required: true,
        /*
        validate: (value: string) => {
            if (!validator.isAlphanumeric(value)) {
                throw new Error('Artist name must contain alphanumeric characters only');
            
        }
        */
    },
    genres: [{
        type: String,
        required: true,
        /*
        validate: (value: string) => {
            if (!validator.isAlphanumeric(value)) {
                throw new Error('Genre name must contain alphanumeric characters only');
            }
        }
        */
    }],
    songs: [{
        type: String,
        required: true,
        /*
        validate: (value: string) => {
            if (!validator.isAlphanumeric(value)) {
                throw new Error('Song name must contain alphanumeric characters only');
            }
        }
        */
    }],
    monthlyListeners: {
        type: Number,
        required: true,
    },
});
  
export const Artist = model('Artist', ArtistSchema);
