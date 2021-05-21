let library = [];

const bookFactory = (author, title, numberOfPages, read) => {
  return { author, title, numberOfPages, read };
};

// simple function of creating books
// function Book(author, title, numberOfPages, read) {
//   this.author = author;
//   this.title = title;
//   this.numberOfPages = numberOfPages;
//   this.read = read;
// }

function libraryInitialization() {
  if (library.length === 0) {
    // using simple fucntion of creating books
    // library.push(new Book('E. Freeman', 'Head First JavaScript', 1212, false));
    // library.push(new Book('A. Y. Bhargava', 'Grokking Algorithms', 254, true));
    // library.push(new Book('M. Twain', 'Tom Sawyer', 333, false));
    // library.push(new Book('D. Griffiths', 'Head First Rails', 1444, true));
    library.push(bookFactory('E. Freeman', 'Head First JavaScript', 1212, false));
    library.push(bookFactory('A. Y. Bhargava', 'Grokking Algorithms', 254, true));
    library.push(bookFactory('M. Twain', 'Tom Sawyer', 333, false));
    library.push(bookFactory('D. Griffiths', 'Head First Rails', 1444, true));
  }
}

const form = document.getElementsByClassName('myForm')[0];
form.style.display = 'none';

function displayBooks() {
  libraryInitialization();
  document.getElementById('books-container').innerHTML = '';
  library.forEach((book) => {
    let type = 'btn-success';
    let btnName = 'Read: yes';
    if (book.read) {
      type = 'btn-success';
      btnName = 'Read: yes';
    } else {
      type = 'btn-danger';
      btnName = 'Read: no';
    }
    const mainDiv = document.createElement('div');
    mainDiv.style.maxWidth = '18rem';
    mainDiv.setAttribute('class', 'card text-dark bg-light mb-3');
    mainDiv.setAttribute('id', `card${library.indexOf(book)}`);
    document.getElementById('books-container').appendChild(mainDiv);

    const cardHeader = document.createElement('div');
    cardHeader.setAttribute('class', 'card-header');
    cardHeader.innerText = `Book: ${book.title}`;

    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.setAttribute('class', 'card-title');
    cardTitle.innerText = `Author: ${book.author}`;

    const cardText = document.createElement('p');
    cardText.setAttribute('class', 'card-text');
    cardText.innerText = `Number of pages: ${book.numberOfPages}`;

    const statusBtn = document.createElement('button');
    statusBtn.setAttribute('class', `status-btn btn mx-3 ${type}`);
    statusBtn.innerText = btnName;
    statusBtn.onclick = function getStatus() {
      const btn = document.getElementsByClassName('status-btn')[library.indexOf(book)];
      if (book.read) {
        btn.setAttribute('class', 'status-btn btn btn-danger mx-3');
        btn.innerText = 'Read: no';
        book.read = false;
      } else {
        btn.setAttribute('class', 'status-btn btn btn-success mx-3');
        btn.innerText = 'Read: yes';
        book.read = true;
      }
      localStorage.setItem('library', JSON.stringify(library));
    };

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'btn btn-danger m-3');
    removeBtn.innerText = 'Delete Book';
    removeBtn.onclick = function removeBook() {
      const id = library.indexOf(book);
      document.getElementsByClassName('card')[id].remove();
      library.splice(id, 1);
      localStorage.setItem('library', JSON.stringify(library));
    };

    mainDiv.appendChild(cardHeader);
    cardHeader.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    mainDiv.appendChild(statusBtn);
    mainDiv.appendChild(removeBtn);
  });
}

const addBtn = document.getElementById('add-book-btn');
addBtn.onclick = function addBookToLibrary() {
  const author = document.getElementById('author').value;
  const title = document.getElementsByName('title')[0].value;
  const numberOfPages = document.getElementsByName('numberOfPages')[0].value;
  const read = document.getElementById('flexCheckDefault');
  const errors = document.getElementById('errors');
  if (author.length === 0 || title.length === 0 || numberOfPages.length === 0) {
    errors.style.display = 'block';
    errors.innerText = 'Please complete all fields';
    errors.style.color = 'red';
  } else {
    errors.style.display = 'none';
    library.push(bookFactory(author, title, numberOfPages, read.checked));
    const form = document.getElementsByClassName('myForm')[0];
    form.reset();
    localStorage.setItem('library', JSON.stringify(library));
    displayBooks();
  }
};

const displayFormBtn = document.getElementById('display-form-btn');
displayFormBtn.onclick = function displayForm() {
  const form = document.getElementsByClassName('myForm')[0];
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
};

if (typeof localStorage.getItem('library') !== 'undefined' && localStorage.getItem('library') != null) {
  library = JSON.parse(localStorage.getItem('library'));
}