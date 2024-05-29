const express = require('express')
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require('.routes/api');
const { prototype } = require('events');
app.use('/api', apiRoutes);

app.get('/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'pbulic', 'index.html'));
});

app.listen(PORT, console.log(`App Listening on http://localhost:${PORT}`));