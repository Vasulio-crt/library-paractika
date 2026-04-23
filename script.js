const content_books = document.getElementById('content-books');
const template = document.getElementById('temp-book');

function addBook(data, index) {
	const clone = template.content.cloneNode(true);
	const bookElement = clone.querySelector('div');
	bookElement.dataset.index = index;

	const p = clone.querySelectorAll("p");
	p[0].textContent = 'Название: ' + data.title;
	p[1].textContent = 'Автор: ' + data.author;
	p[2].textContent = 'Год: ' + data.year;
	p[3].textContent = 'Жанр: ' + data.genre;

	const editBtn = clone.querySelector('.edit-btn');
	editBtn.addEventListener('click', () => editBook(index));

	const deleteBtn = clone.querySelector('.delete-btn');
	deleteBtn.addEventListener('click', () => deleteBook(index));

	content_books.appendChild(clone);
}

const form = document.getElementById('add-form');
const addBookBtn = document.getElementById('add-book');
const clearFormBtn = document.getElementById('clear-form');
function resetForm() {
	form.reset();
	delete form.dataset.editIndex;
	addBookBtn.textContent = 'Добавить';
	clearFormBtn.textContent = 'Удалить все книги';
	clearFormBtn.onclick = deleteAllBooks;
	document.getElementById('title').focus();
}

function saveData(data) {
	localStorage.setItem('books', JSON.stringify(data));
}

function renderBooks() {
	content_books.innerHTML = '';
	books.forEach((book, index) => {
		addBook(book, index);
	});
}

/** @type {Array<Object>} */
let books = [];
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const editIndex = form.dataset.editIndex;

	const title = document.getElementById('title').value.trim();
	const author = document.getElementById('author').value.trim();
	let year = document.getElementById('year').value.trim();
	year = year === '0' ? '1' : year;
	const genre = document.getElementById('genre').value.trim();
	const data = {title: title, author: author, year: year, genre: genre};

	if (editIndex !== undefined) {
		books[editIndex] = data;
	} else {
		books.push(data);
	}

	saveData(books);
	renderBooks();
	resetForm();
});

function editBook(index) {
	const book = books[index];
	document.getElementById('title').value = book.title;
	document.getElementById('author').value = book.author;
	document.getElementById('year').value = book.year;
	document.getElementById('genre').value = book.genre;

	form.dataset.editIndex = index;
	addBookBtn.textContent = 'Изменить';
	clearFormBtn.textContent = 'Отменить редактирование';
	clearFormBtn.onclick = resetForm;
	document.getElementById('title').focus();
}

function deleteBook(index) {
	if (confirm(`Вы уверены, что хотите удалить книгу "${books[index].title}"?`)) {
		books.splice(index, 1);
		saveData(books);
		renderBooks();
	}
}

function deleteAllBooks() {
	if (confirm('Вы уверены что хотите удалить все книги?')) {
		books = [];
		saveData(books);
		renderBooks();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const data = localStorage.getItem('books');
	if (data) {
		books = JSON.parse(data);
		renderBooks();
	}
});
