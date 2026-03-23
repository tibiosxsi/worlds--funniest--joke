const express = require('express');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Sample jokes data
let jokes = [
    { id: 1, joke: "Why don't scientists trust atoms? Because they make up everything!" },
    { id: 2, joke: "Why did the scarecrow win an award? Because he was outstanding in his field!" },
    { id: 3, joke: "Why don't skeletons fight each other? They don't have the guts." }
];

// Get all jokes
app.get('/api/jokes', (req, res) => {
    res.json(jokes);
});

// Get a specific joke
app.get('/api/jokes/:id', (req, res) => {
    const joke = jokes.find(j => j.id === parseInt(req.params.id));
    if (!joke) return res.status(404).send('Joke not found');
    res.json(joke);
});

// Add a new joke
app.post('/api/jokes', (req, res) => {
    const newJoke = {
        id: jokes.length + 1,
        joke: req.body.joke
    };
    jokes.push(newJoke);
    res.status(201).json(newJoke);
});

// Update a joke
app.put('/api/jokes/:id', (req, res) => {
    const joke = jokes.find(j => j.id === parseInt(req.params.id));
    if (!joke) return res.status(404).send('Joke not found');
    joke.joke = req.body.joke;
    res.json(joke);
});

// Delete a joke
app.delete('/api/jokes/:id', (req, res) => {
    const jokeIndex = jokes.findIndex(j => j.id === parseInt(req.params.id));
    if (jokeIndex === -1) return res.status(404).send('Joke not found');
    jokes.splice(jokeIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
