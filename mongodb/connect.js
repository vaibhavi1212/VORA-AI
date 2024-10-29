import mongoose from "mongoose";


const connectDB = (urls) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(urls)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
}
export default connectDB;