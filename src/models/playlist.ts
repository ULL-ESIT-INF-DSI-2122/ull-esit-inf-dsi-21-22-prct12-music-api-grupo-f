import {model, Schema} from 'mongoose';

const PlaylistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    songs: [{
        type: String,
        required: true,
    }],
    duration: {
        type: Number,
        required: true,
    },
    genres: [{
        type: String,
        required: true,
    }],
});
  
export const Playlist = model('Playlist', PlaylistSchema);