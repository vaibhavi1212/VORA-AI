import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch'; // Use fetch to make HTTP requests

dotenv.config();

const router = express.Router();
const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

// Test route to check if the API is working
router.route('/').get((req, res) => {
  console.log('Received GET request on /stable-diffusion');
  res.send('Hello from Stable Diffusion!');
});

// Post route to handle image generation requests
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('Received prompt:', prompt);

    if (!prompt) {
      console.error('Prompt is required');
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Call Hugging Face API for Stable Diffusion
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      console.error('Failed to generate image');
      return res.status(500).json({ error: 'Failed to generate image' });
    }

    // Convert response to base64
    const imageData = await response.arrayBuffer(); // Read binary response as buffer
    const base64Image = Buffer.from(imageData).toString('base64'); // Convert buffer to base64

    // Send the base64 image back to the frontend
    return res.status(200).json({
      success: true,
      image: base64Image,
      message: `Image successfully generated for prompt: ${prompt}`,
    });

  } catch (error) {
    console.error('Server error:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }
});


export default router;
