const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];
let idCounter = 1;

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: idCounter++, title, content };
  posts.push(newPost);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post });
});

app.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
