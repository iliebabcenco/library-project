let library = [];

function Book(author, title, numberOfPages, read) {
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.read = read;
}

function addBookToLibrary() {
  const author = document.getElementById('author').value;
  const title = document.getElementsByName('title')[0].value;
  const numberOfPages = document.getElementsByName('numberOfPages')[0].value;
  library.push(new Book(author, title, numberOfPages, false));
  const form = document.getElementsByClassName('myForm')[0];
  form.reset();
  localStorage.setItem('library', JSON.stringify(library));
  displayBooks();
}
function displayBooks() {
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
    const div = document.createElement('div');
    div.innerHTML = `<div class='card-header'>Book: ${book.title
    }</div><div class='card-body'><h5 class='card-title'>Author: ${book.author
    }</h5><p class='card-text'>Number of pages: ${book.numberOfPages
    }</p></div> <button class='status-btn btn ${type} mx-3' onclick=setReadStatus(${library.indexOf(book)})`
        + `>${btnName}</button> <button class='btn btn-danger m-3' onclick=removeBookFromLibrary(${library.indexOf(book)})`
        + '>Delete Book</button>';
    div.style.maxWidth = '18rem';
    div.setAttribute('class', 'card text-dark bg-light mb-3');
    div.setAttribute('id', `card${library.indexOf(book)}`);
    document.getElementById('books-container').appendChild(div);
  });
}

function displayForm() {
  const form = document.getElementsByClassName('myForm')[0];
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
}

function removeBookFromLibrary(id) {
  library.splice(id, 1);
  document.getElementById(`card${id}`).remove();
  localStorage.setItem('library', JSON.stringify(library));
}

function setReadStatus(id) {
  const btn = document.getElementsByClassName('status-btn')[id];
  const book = library[id];
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
}

if (typeof localStorage.getItem('library') !== 'undefined' && localStorage.getItem('library') != null) {
  library = JSON.parse(localStorage.getItem('library'));
}