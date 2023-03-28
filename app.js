// Book class represents a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class:  handles UI
class UI {
  static displayBooks() {
    const StoreBooks = [
      {
        title: 'Book One',
        author: 'John Doe',
        isbn: '34576',
      },
      {
        title: 'Book Two',
        author: 'Jane Doe',
        isbn: '34576',
      },
    ];
    const books = StoreBooks;
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
        <td> ${book.title}</td>
        <td> ${book.author}</td>
        <td> ${book.isbn}</td>
        <td><a href="#" class ="btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

    static showAlert(message, className){
        const div  = document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container =document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div, form);
        
    }
    
    
    static clearFields(){
        document.querySelector('#title'). value ='';
        document.querySelector('#author'). value ='';
        document.querySelector('#isbn'). value ='';
    }
}

// storage class; Manages storage
class Store{
   static getBooks() {
    let books;
    if (localStorage.getItem ('books') ===null){
        books =[];
        
    }else{
        books =JSON.parse(localStorage.getItem('books'));
    }
    return books;

    }
    static addBooks() {
        const books =Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSONstringfy(books));

    }
    static removegetBooks() {
        const books=Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn===isbn) {

            }
        })

    }
}

// event; Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// event add Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // get from values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill all fields', 'danger');
  } else {
    // instantiate book
    const book = new Book(title, author, isbn);

    // add book to UI
    UI.addBookToList(book);
    // show sucess message 
    UI.showAlert('Book Added', 'sucess');

    // Clear fields
    UI.clearFields(book);
  }
});

// Event remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => 
{
    UI.deleteBook(e.target)

});