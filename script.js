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

