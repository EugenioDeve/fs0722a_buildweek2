


async function loadJSON(url) {
    const res = await fetch(url);
    return await res.json();
}


///////////////////variaibli//////////////////////////////////////////////////////////77
let tabella = document.getElementById('tabella-body')
let header = document.getElementById('boxHeader')
let titoloAlbumNav = document.querySelector("#titolo-album-nav");



//funzione per calcolare il minutaggio
function convertiInMinuti(durata) {
    let minuti = Math.floor(durata / 60);
    let secondi = durata - minuti * 60;
    return minuti + ":" + secondi;
}

// funzione per creare elemento tabella con lista track
function listaTracks(data) {
    const html = `<tr>
    <td scope="row">${i}</td>
    <td>${data.title}</td>
    <td>${data.rank} </td>
    <td colspan="2">${convertiInMinuti(data.duration)}</td >
    
</tr>`
    tabella.insertAdjacentHTML('beforeend', html)
}


// funzione per creare Header con immagine e tiotlo album
function headerAlbum(data) {
    const html = `<img src="${data.cover_medium}" alt ="imgalbum" id="imgAlbum">
    <div class="p-3">
        <p>ALBUM</p>
        <h3>${data.title}</h3>
        <p><a href='../artistPage/artisti.html?artistId=${data.artist.id}' class='text-light text-decoration-none fs-5'>${data.artist.name}</a></p>
    </div>`
    titoloAlbumNav.textContent = data.title;
    header.insertAdjacentHTML('beforeend', html)
}



//funzione per creare la sezione Ascolta anche








// quando clicchiamo sul album in homepage, mi carica in pagina album le canzoni dellalbum piu immagine
let i = 1;
window.onload = async () => {
    let url = new URLSearchParams(window.location.search)
    let id = url.get("albumId");
    console.log(id)

    loadJSON(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`).then(res => {
        console.log(res);

        // richiamo funzioni per popolare html

        headerAlbum(res)
        res.tracks.data.forEach(element => {
            listaTracks(element);
            i++;
        });

    })

}

