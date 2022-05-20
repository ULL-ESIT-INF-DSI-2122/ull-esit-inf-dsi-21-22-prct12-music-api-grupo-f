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
        unique: true,
        required: true,
        trim: true,
        validate: (value: string) => {
            if (!value.match(/^[A-Za-z0-0-'-,\s]+$/g)) {
                throw new Error('The artist name must be a combination of letters, numbers or spaces.');
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
    songs: [{
        type: String,
        required: true,
        trim: true,
        validate: (value: string) => {
            if (!value.match(/^[A-Za-z0-0-'-,\s]+$/g)) {
                throw new Error('The song name must be a combination of letters, numbers or spaces.');
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
