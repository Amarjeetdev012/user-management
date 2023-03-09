import mongoose from 'mongoose'
import { mongoUrl } from '../config';

export const connectDatabase = () => {
    console.log('mongodb is connecting...');
    mongoose.connect(mongoUrl!)
        .then(() => {
            console.log('mongodb is connected');
        }).catch((e) => {
            console.log(e);
        })
}