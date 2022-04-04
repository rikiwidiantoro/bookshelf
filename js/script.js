document.addEventListener("DOMContentLoaded", function() {

    const submitTambah = document.getElementById("inputBook");
    
    submitTambah.addEventListener("submit", function(event) {
        event.preventDefault(); // untuk mencegah behaviour asli agar tidak dijalankan. Karena secara default jika tombol submit diklik maka browser akan mengirimkan data ke url yang tertera pada properti action dan browser akan di-refresh.
        tambahBuku();
    });


    if( cekStorage() ) {
        loadDataFromStorage();
    }

});



document.addEventListener("datadisimpan", () => {
    console.log('Data berhasil disimpan!');
});

document.addEventListener("dataloaded", () => {
    refreshDataFromBooks();
});
