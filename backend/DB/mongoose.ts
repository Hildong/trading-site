import mongoose from 'mongoose';

export async function connectToDatabase() {
    try {
        const mongoDBURI = `mongodb+srv://admin:${process.env.MONGODB_ATLAS_ADMIN_PASSWORD}@cluster0.azoyaq6.mongodb.net/?retryWrites=true&w=majority`
  
        await mongoose.connect(mongoDBURI);
  
        console.log('Connected to MongoDB Atlas!');
    } catch (error) {
        console.error('Failed to connect to MongoDB Atlas:', error);
    }
}
