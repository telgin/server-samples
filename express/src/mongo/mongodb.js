import mongoose from 'mongoose';
import * as models from './models';

const url = 'mongodb://localhost:27017/hogdb';


export const find = async (id) => {
    const db = await mongoose.connect(url);

    const hog = await models.hogs.findOne({id}).exec();

    return hog;
};

export const save = async (hog) => {
    const db = await mongoose.connect(url);

    await models.hogs.updateOne({id: hog.id}, hog, {upsert: true});

};

export const del = async (id) => {
    const db = await mongoose.connect(url);

    await models.hogs.remove({id}).exec();
};