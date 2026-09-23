import dns from "dns";
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to Mongodb Successfully")
}).catch((err) => {
    console.log(err);
});

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);