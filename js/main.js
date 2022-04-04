const UNCOMPLETED_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_ID = "completeBookshelfList";

const BOOK_ITEMID = "itemId";


function buatKotak(judul, penulis, tahun, isCompleted) {
    const textJudul = document.createElement('h3');
    textJudul.innerText = judul;
    const textPenulis = document.createElement('p');
    textPenulis.innerHTML = "Penulis : <span>" + penulis + "</span>";
    const textTahun = document.createElement('p');
    textTahun.innerHTML = "Tahun : <span>" + tahun + "</span>";


    textPenulis.classList.add('penulis');
    textTahun.classList.add('tahun');


    const divTombol = document.createElement('div');

    const kontainer = document.createElement('div');
    
    kontainer.append(textJudul, textPenulis, textTahun, divTombol);

    if( isCompleted ) {
        divTombol.append(
            kembaliBelumSelesai(),
            tambahTrashTombol()
            );
    } else {
        divTombol.append(
            cekTombol(), 
            tambahTrashTombol());
    }


    return kontainer;
}


function cekTombol() { //createCheckButton()
    return buatTombolSelesai('green', function(event) {
        tambahToSelesai(event.target.parentElement.parentElement);
    });
}
function tambahTrashTombol() { //createTrashButton()
    return buatTombolHapus('red', function(event) {
        hapusSetelahSelesai(event.target.parentElement.parentElement);
    });
}
function kembaliBelumSelesai() { // createUndoButton()
    return buatTombolKembali('green', function(event) {
        belumSelesaiToKembali(event.target.parentElement.parentElement);
    });
}


function tambahBuku() {
    const uncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);

    const judul = document.getElementById('inputBookTitle').value;
    const penulis = document.getElementById('inputBookAuthor').value;
    const tahun = document.getElementById('inputBookYear').value;


    const book = buatKotak(judul, penulis, tahun, false);

    const bookObject = composeBookObjek(judul, penulis, tahun, false);
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);


    uncompleted.append(book);
    alert("Buku berhasil ditambahkan!");


    updateDataToStorage();
}


// membuat tombol
function buatTombolSelesai(buttonTypeClass, eventListener) {
    const tombol = document.createElement("input");
    tombol.setAttribute('type', 'submit');
    tombol.setAttribute('value', 'Selesai dibaca');
    tombol.classList.add(buttonTypeClass);
    tombol.addEventListener('click', function(event) {
        eventListener(event);
    });
    return tombol;
}
function buatTombolHapus(buttonTypeClass, eventListener) {
    const tombol = document.createElement("input");
    tombol.setAttribute('type', 'submit');
    tombol.setAttribute('value', 'Hapus Buku');
    tombol.classList.add(buttonTypeClass);
    tombol.addEventListener('click', function(event) {
        eventListener(event);
    });
    return tombol;
}
function buatTombolKembali(buttonTypeClass, eventListener) {
    const tombol = document.createElement("input");
    tombol.setAttribute('type', 'submit');
    tombol.setAttribute('value', 'Belum Selesai dibaca');
    tombol.classList.add(buttonTypeClass);
    tombol.addEventListener('click', function(event) {
        eventListener(event);
    });
    return tombol;
}


// untuk menampilkan todo yang sudah ditandai sebagai todo yang telah selesai
function tambahToSelesai(taskElement) { // addtasktocompleted

    const listCompleted = document.getElementById(COMPLETED_BOOK_ID);
    const taskJudul = taskElement.querySelector('h3').innerText;
    const taskPenulis = taskElement.querySelector('.penulis > span').innerText;
    const taskTahun = taskElement.querySelector('.tahun > span').innerText;

    const newBook = buatKotak(taskJudul, taskPenulis, taskTahun, true);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;


    listCompleted.append(newBook);
    taskElement.remove(); //untuk menghapus todo yang belum selesai.

    updateDataToStorage();
}

function belumSelesaiToKembali(taskElement) { //undoTaskFromCompleted()
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    const taskJudul = taskElement.querySelector('h3').innerText;
    const taskPenulis = taskElement.querySelector('.penulis > span').innerText;
    const taskTahun = taskElement.querySelector('.tahun > span').innerText;

    const newBook = buatKotak(taskJudul, taskPenulis, taskTahun, false);


    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;


    listUncompleted.append(newBook);
    taskElement.remove();


    updateDataToStorage();
}



function hapusSetelahSelesai(taskElement) { //removeTaskFromCompleted()

    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);


    taskElement.remove();
    alert("Buku berhasil dihapus!");
    
    
    updateDataToStorage();
}

