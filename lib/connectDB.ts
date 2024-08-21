import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL as string;
console.log('DB:  ' + DATABASE_URL);
if (!DATABASE_URL) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let isConnected: boolean = false;

const connectToDatabase = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(DATABASE_URL, {
            dbName: 'task-manager',
        });
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        // console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

export default connectToDatabase;
