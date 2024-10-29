import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import stableDiffusionRoutes from './routes/stableDiffusionRoutes.js'; // Renamed file

dotenv.config();

const app = express();
app.use(cors({
    origin: '*', // Use specific origin in production
  }));
  
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/stable-diffusion', stableDiffusionRoutes); // Updated route

app.get('/', async (req, res) => {
  res.send('Hello from Stable Diffusion!');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server has started on port http://localhost:8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
