import mongoose from 'mongoose';
import { mongoUrl } from '../config';

export const connectDatabase = () => {
    console.log('mongodb is connecting...');
    mongoose.connect(mongoUrl);
    mongoose.connection.on('connected', () => {
        console.log('mongodb is connected');
    });
    mongoose.connection.on('error', err => {
        console.log(err);
        process.exit(1)
    });
};
