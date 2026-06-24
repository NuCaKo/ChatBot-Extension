const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("DEMO");
});

app.listen(PORT, () => {

console.log('S');


});