const express = require('express'); 
const app = express(); 
const port = 3000; 

app.use(express.static('frontend'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
  res.json({ 
    image: "https://preview.redd.it/i-know-voldemort-is-not-perfect-but-what-is-a-nice-thing-v0-v69aadnzrj2f1.jpeg?width=640&crop=smart&auto=webp&s=fe065bd306e4a6c8f7eee0638a3e933d4d72d26f" 
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
