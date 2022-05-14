import {model, Schema} from 'mongoose';

const SongSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    genre: [{
        type: String,
        required: true,
    }],
    single: {
        type: Boolean,
        required: true,
    },
    reporductions: {
        type: Number,
        required: true,
    },
});
  
export const Song = model('Song', SongSchema);