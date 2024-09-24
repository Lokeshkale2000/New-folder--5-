require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  image: String,
 
});

const Post = mongoose.model('Post', postSchema);


app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, author, image } = req.body; 
    const newPost = new Post({ title, content, author, image });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Failed to add post');
  }
});


app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
   
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Failed to fetch posts');
  }
});


app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Failed to fetch post');
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const { title, content, author, image } = req.body;
    console.log('Received data:', { title, content, author, image });

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author, image },
      { new: true }
    );

    if (!updatedPost) return res.status(404).send('Post not found');
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('Failed to update post');
  }
});


app.delete('/api/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).send('Post not found');
    }

    res.json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send('Failed to delete post');
  }
});




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
