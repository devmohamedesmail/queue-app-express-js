import mongoose from 'mongoose';



const connectDB = async () =>{
    try {
        mongoose.set('strictQuery',false);
        const connect =  await mongoose.connect("mongodb+srv://queueapp:pYjfVCNN47kRw7BO@queueapp.2lys7.mongodb.net/queueapp");
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
       console.log(error); 
    }
}


export default connectDB