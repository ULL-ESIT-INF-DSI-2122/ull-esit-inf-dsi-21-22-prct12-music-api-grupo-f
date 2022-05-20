import {model, Schema, Document} from 'mongoose';
import validator from 'validator';
import { regExp } from '../functions/validateFunctions';

interface ArtistDocumentInterface extends Document {
    name: string,
    genres: string[],
    monthlyListeners: number,
    songs: string[]
}


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
  
export const Artist = model('Artist', ArtistSchema);
