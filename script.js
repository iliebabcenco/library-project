let library = [];


function Book(author, title, numberOfPages) {
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
}

function addBookToLibrary() {
    let author = document.getElementById("author").value;
    let title = document.getElementsByName("title")[0].value;
    let numberOfPages = document.getElementsByName("numberOfPages")[0].value;
    library.push(new Book(author, title, numberOfPages))
}

function displayBooks() {
    for (let book of library) {
        let div = document.createElement('div');
        div.innerHTML = "<div class=\'card-header\'>Book: "+book.title+"</div><div class='card-body'><h5 class='card-title'>Author: "+book.author+"</h5><p class='card-text'>Number of pages: "+book.numberOfPages+"</p></div>";
        div.style.maxWidth = '18rem';
        div.setAttribute('class', 'card text-dark bg-light mb-3');
        document.body.appendChild(div);
    }
}

function displayForm() {
    let form = document.getElementsByClassName("myForm")[0];
    form.style.display = 'block';
}