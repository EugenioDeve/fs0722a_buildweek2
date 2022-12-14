
import { Album } from "../classi/Album.js";





// variabili
let boxBuonasera = document.getElementById('box-articoli-buonasera')
const albums = [
  "5327691",
  "363906907",
  "217489292",
  "359324967",
  "313482367",
  "65373012",
]


// funzione per fare il json
async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

// funzione per creare elemento buonasera
function articleBuonasera(myAlbum) {
  const html = `
    <a  href="../albumPage/album.html?albumId=${myAlbum.id}" class="text-light text-decoration-none col-4" id="a">
    <div class="p-2 " >
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="${myAlbum.img}"
            class="img-fluid rounded-start w-100" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body mt-2">
            <h5 class="card-title">${myAlbum.title}</h5>
            <p>${myAlbum.artista}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </a>`
  boxBuonasera.insertAdjacentHTML('beforeend', html)
}




loadJSON('../json/album-json.JSON').then(data => {
  console.log(data);
  let prova = document.querySelector(".prova");
  prova.innerText = data.title;
  let prova1 = document.querySelector(".prova1");
  prova1.setAttribute("src", data.cover_medium);


})



async function prova1(url) {
  try {
    loadJSON(`https://striveschool-api.herokuapp.com/api/deezer/album/${url}`).then(data => {

      console.log(data);
      let myAlbum = new Album();
      myAlbum.title = data.title;
      myAlbum.img = data.cover_medium;
      myAlbum.artista = data.artist.name;
      myAlbum.id = data.id;
      articleBuonasera(myAlbum)
    })
  } catch (err) { console.error(`${err}`) }
}



albums.forEach(ele => prova1(ele))



//loadJSON('../json/album-json.JSON').then(user => {
//  let id = user.id;
//  let a = document.querySelector('#a');
//  a.addEventListener("click", function () { sessionStorage.setItem('id', id); }
//  )
//})