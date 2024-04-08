const express = require('express');
const server = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://aatif:e2Cu5XDlKl8H54gY@ecommcluster.aqfnzrx.mongodb.net/ecommerceDatabase');
    console.log('Connected to MongoDB')

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const kittySchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', kittySchema);

server.use(cors());
server.use(bodyParser.json());

server.post('/api/demo', async (req, res) => {
    let user = new User(req.body);
    const doc = await user.save();
    console.log(doc)
    res.json(doc)
})


server.get('/api/demo', async (req, res) => {
    const users = await User.find();
    res.json(users)
})

// Serve static files from the frontend/dist directory
server.use(express.static(path.resolve(__dirname, "frontend", "dist")));

// Send the frontend's index.html file for any unknown routes
server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


server.listen(8080, () => {
    console.log('Server is running on port 8080')
})