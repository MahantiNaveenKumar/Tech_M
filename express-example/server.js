const express = require('express'); // Import express
const bodyParser = require('body-parser'); // Import body-parser

const app = express(); // Initialize express application
app.use(bodyParser.json()); // Middleware to parse JSON request body

// Sample Data
let data = [
    { id: 1, name: 'Name 1', age: 20 },
    { id: 2, name: 'Name 2', age: 25 },
    { id: 3, name: 'Name 3', age: 30 }
];

// ✅ Root Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// ✅ Admin Page
app.get('/page2', (req, res) => {
    res.send('Admin page');
    console.log('Admin page accessed');
});

// ✅ Movies Page
app.get('/movies', (req, res) => {
    res.send('Movies page');
    console.log('Movies page accessed');
});

// ✅ Movie Characters Page
app.get('/movies/characters', (req, res) => {
    res.send('List of characters in the movie');
});

// ✅ Fetch All Users (NEWLY ADDED)
app.get('/data', (req, res) => {
    res.json(data);
});

// ✅ Fetch a User by ID
app.get('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const dataUser = data.find(user => user.id === id);
    
    if (dataUser) {
        res.json(dataUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// ✅ Add New User (POST Request)
app.post('/data', (req, res) => {
    const { name, age } = req.body;
    const id = data.length + 1;

    const newData = { id, name, age };
    data.push(newData);

    res.json(newData);
});

// ✅ Handle 404 Errors (Unknown Routes)
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// ✅ Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
