/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable max-classes-per-file */
// your code with multiple classes

// Store class: manages storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    const index = books.findIndex((book) => book.isbn === isbn);
    if (index !== -1) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
}

// Book class represents a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class: handles UI
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>
        <button class="delete-button">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    `;
    list.appendChild(row);
  }

  static deleteBook(element) {
    if (element.classList.contains('delete-button')) {
      element.closest('tr').remove();
    }
  }

  static showAlert(message, className, sectionId) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const section = document.querySelector(`#${sectionId}`);
    section.insertBefore(div, section.firstChild);
    setTimeout(() => div.remove(), 4000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Event: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    const book = new Book(title, author, isbn);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.showAlert('Book Added', 'success', 'add-book-form');
    UI.clearFields();
  }
});

// Event: remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(
    e.target.closest('tr').querySelectorAll('td')[2].textContent,
  );
  UI.showAlert('Book removed', 'success', 'book-list-c');
});

// Get the book list section
const bookListSection = document.getElementById('book-list-c');

// Hide the other sections
const addBookSection = document.getElementById('add-book-form');
const contactInfoSection = document.getElementById('contact-info');
addBookSection.style.display = 'none';
contactInfoSection.style.display = 'none';

// Add an event listener to each navigation link
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default link behavior

    // Hide all sections except for the selected one
    switch ((e).target.hash) {
      case '#book-list-c':
        bookListSection.style.display = 'block';
        addBookSection.style.display = 'none';
        contactInfoSection.style.display = 'none';
        break;
      case '#add-book-form':
        bookListSection.style.display = 'none';
        addBookSection.style.display = 'block';
        contactInfoSection.style.display = 'none';
        break;
      case '#contact-info':
        bookListSection.style.display = 'none';
        addBookSection.style.display = 'none';
        contactInfoSection.style.display = 'block';
        break;
    }
  });
});

// Show the book list section by default
bookListSection.style.display = 'block';

const contactForm = document.querySelector('#contact-info form');

// select the form and add a submit event listener
document.querySelector('#contact-info form').addEventListener('submit', (e) => {
  e.preventDefault(); // prevent the default form submission behavior

  // get the input values
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const message = document.querySelector('#message').value;

  // create a new message object with the input values
  const newMessage = {
    name,
    email,
    message,
    timestamp: new Date().getTime(), // add a timestamp to track when the message was sent
  };

  // get the existing messages from local storage, or initialize an empty array
  // eslint-disable-next-line prefer-const
  let messages = JSON.parse(localStorage.getItem('messages')) || [];

  // add the new message to the array
  messages.push(newMessage);

  // store the updated messages array in local storage
  localStorage.setItem('messages', JSON.stringify(messages));

  // show a success message to the user
  UI.showAlert('Message sent', 'success', 'contact-info');

  // reset the form inputs
  e.target.reset();
});
