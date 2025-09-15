const form = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');

const BASE_URL = 'https://backend-repo-2sd4.onrender.com/';

const fetchBooks = async () => {
  const res = await fetch(`${BASE_URL}/api/books`);
  const books = await res.json();

  bookList.innerHTML = '';
  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} by ${book.author}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteBook(book.id);

    li.appendChild(delBtn);
    bookList.appendChild(li);
  });
};

const addBook = async (title, author) => {
  await fetch(`${BASE_URL}/api/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author })
  });
  fetchBooks();
};

const deleteBook = async (id) => {
  await fetch(`${BASE_URL}/api/books/${id}`, { method: 'DELETE' });
  fetchBooks();
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const title = form.title.value;
  const author = form.author.value;
  addBook(title, author);
  form.reset();
});

fetchBooks();