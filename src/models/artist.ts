import {model, Schema} from 'mongoose';

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    genres: [{
        type: String,
        required: true,
    }],
    songs: [{
        type: String,
        required: true,
    }],
    listeners: {
        type: Number,
        required: true,
    },
});
  
export const Artist = model('Artist', ArtistSchema);