import mongoose from 'mongoose';

const hogSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const hogs = mongoose.model('Hog', hogSchema);