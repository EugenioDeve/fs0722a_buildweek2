import { Album } from "../classi/Album.js";

// variabili//////////////////////////////////////////////////////////
let boxBuonasera = document.getElementById("box-articoli-buonasera");
const albums = [
  "5327691",
  "363906907",
  "9178393",
  "359324967",
  "184476372",
  "271595",
];
let boxArtisti = document.querySelector("#artisti");
const artists = [];

//funzione che crea numeri casuali//////////////////////////////////////////////
for (let i = 0; i < 5; i++) {
  let num = Math.round(Math.random() * 10000);
  artists[i] = num;
}

// funzione per fare il json//////////////////////////////////////////////////
async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

// funzione per creare elemento buonasera////////////////////////////////////////
function articleBuonasera(myAlbum) {
  const html = `
    <a  href="../albumPage/album.html?albumId=${myAlbum.id}" class="text-light text-decoration-none col-6 col-md-4 p-1" id="a">
    <div>
    <div class="card">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="${myAlbum.img}"
            class="img-fluid rounded-start w-100" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body mt-2 p-4">
            <h5 class="card-title">${myAlbum.title}</h5>
            <p>${myAlbum.artista}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </a>`;
  boxBuonasera.insertAdjacentHTML("beforeend", html);
}

// funzione per creare html di ASCOLTA ANCHE/////////////////////////////////////////////
function artistiHomepage(artisti) {
  const card = ` <a   href="../artistPage/artisti.html?artistId=${artisti.id}"  class="text-decoration-none col-6 col-md-2 pb-5 "> <div id="ultimo" class="text-light">
  <div class="card">
    <div class="carta">
    <img
      src="${artisti.picture_medium}"
      class="card-img-top" alt="...">
    </div>
    <div class="card-body padding-testo d-flex">
      <p class="card-text align-self-center">${artisti.name}</p>
    </div>
  </div>
</div></a>`;
  boxArtisti.insertAdjacentHTML("beforeend", card);
}

// fetch per l'header
const id = 9076739;
loadJSON(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`).then(
  (id) => {
    console.log(id);
    let prova = document.querySelector(".prova");
    prova.innerText = id.title;
    let nome = document.querySelector("#nome");
    let ascolta = document.querySelector("#ascolta");
    let link = document.querySelector("#ancor");
    link.setAttribute("href", `../albumPage/album.html?albumId=9076739`);
    nome.innerHTML = `${id.artist.name}`;
    ascolta.innerHTML = `Ascolta l'album di ${id.artist.name}`;
    let prova1 = document.querySelector(".prova1");
    prova1.setAttribute("src", id.cover_medium);
  }
);

// funzione asincrona per stampare in BUONASERA////////////////////////////////////////////
async function prova1(url) {
  try {
    loadJSON(
      `https://striveschool-api.herokuapp.com/api/deezer/album/${url}`
    ).then((data) => {
      console.log(data);
      let myAlbum = new Album();
      myAlbum.title = data.title;
      myAlbum.img = data.cover_medium;
      myAlbum.artista = data.artist.name;
      myAlbum.id = data.id;
      articleBuonasera(myAlbum);
    });
  } catch (err) {
    console.error(`${err}`);
  }
}
// richiamo funzione
albums.forEach((ele) => prova1(ele));

// fdunzione asincrona per mostrare artisti random in ASCOLTA ANCHE/////////////////
async function stampaArtista(id) {
  try {
    loadJSON(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`
    ).then((data_artist) => {
      console.log(data_artist);
      artistiHomepage(data_artist);
    });
  } catch (err) {
    console.error(`${err}`);
  }
}

// richiamo funzione nel ciclo
for (let artista of artists) {
  stampaArtista(artista);
}
