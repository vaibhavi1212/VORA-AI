import mongoose from "mongoose";

// Define the Post schema
const PostSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the user or post creator
  prompt: { type: String, required: true }, // The prompt given to generate the image
  photo: { type: String, required: true }  // The base64 string of the generated image
});

// Create and export the Post model
const Post = mongoose.model('Post', PostSchema);

export default Post;
