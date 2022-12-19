// funzione async per il json
async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

///////////////////variabili//////////////////////////////////////////////////////////77
let tabella = document.getElementById("tabella-body");
let header = document.getElementById("boxHeader");
let titoloAlbumNav = document.querySelector("#titolo-album-nav");
let containerALtriAlbum = document.getElementById("containerAltriAlbum");
let titolo = document.getElementById("titolo-album-nav");
// variabili per le canzoni

let btn_play = document.getElementById("play1");
let nomeArtista = document.querySelector(".nome-artista");
let btn_succ = document.querySelector(".traccia-succ");
let btn_prec = document.querySelector(".traccia-prec");
let nomeTraccia = document.querySelector(".nome-traccia");
let imgCanzone = document.querySelector("#imgCanzone");
let bottonePausa = document.querySelector(".pausa");
let bottonePlay = document.getElementById("bottone-play");
let ripeti = document.querySelector(".repeat");
let playTotale = document.querySelector(".playTotale");
let successivo = document.querySelector(".traccia-succ");
let precedente = document.querySelector(".traccia-prec");
let volume = document.querySelector("#volume");
let mute = document.querySelector(".mute");
let container = document.querySelector(".progress");
let elapsed = document.querySelector(".elapsed");
let verde = document.querySelectorAll(".verde");
let audio = new Audio();

const tracceAudio = [];

//funzione per calcolare il minutaggio
function convertiInMinuti(durata) {
  let minuti = Math.floor(durata / 60);
  let secondi = durata - minuti * 60;
  if (secondi < 10) {
    return minuti + ":0" + secondi;
  } else {
    return minuti + ":" + secondi;
  }
}

// funzione per creare elemento tabella con lista track
function listaTracks(data) {
  const html = `<tr>
    <td class="d-none d-md-inline index mt-1" scope="row">${i}</td>
    <td class="titolo">${data.title}</td>
    <td class="listaId" >${data.rank} </td>
    <td class="d-md-none"><div class="dropdown d-inline"></td>
    <td class="d-md-none"><button class="btn text-light fs-2 " type="button" data-bs-toggle="dropdown"
        aria-expanded="false">
        <i class="bi bi-three-dots"></i>
    </button>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
</div></td>
    <td class="d-none d-md-inline" colspan="2">${convertiInMinuti(
      data.duration
    )}</td >
    
</tr>`;
  tabella.insertAdjacentHTML("beforeend", html);
}

// funzione per creare Header con immagine e tiotlo album
function headerAlbum(data) {
  const html = `<img src="${data.cover_medium}"  alt ="imgalbum" id="imgAlbum">
    <div class="p-3">
        <p class="d-none d-md-block">ALBUM</p>
        <h3>${data.title}</h3>
        <p><a href='../artistPage/artisti.html?artistId=${data.artist.id}' class='text-light text-decoration-none fs-5'>${data.artist.name}</a></p>
        <p class="d-block d-md-none">Album</p>
    </div>`;
  titoloAlbumNav.textContent = data.title;
  header.insertAdjacentHTML("beforeend", html);
}

// funzione per creare altri album nella sezione artista
function renderAltriALbum(data) {
  const html = `
    
    <a href="../albumPage/album.html?albumId=${data.album.id}"  class="col-6 col-lg-2 m-3 mx-auto text-decoration-none">
    <div class="col-lg-3 text-white">
    <div class="card card2">
        <img src=${data.album.cover_medium}
            class="card-img-top" alt="imgAlbum">
        <div class="card-body">
            <p class="card-text fw-bold">${data.album.title}</p>
        </div>
    </div>
</div>
</a>
`;

  containerALtriAlbum.insertAdjacentHTML("beforeend", html);
}

// quando clicchiamo sul album in homepage, mi carica in pagina album le canzoni dellalbum piu immagine
let i = 1;
let j = 0;

let index;
window.onload = async () => {
  let url = new URLSearchParams(window.location.search);
  let AlbumId = url.get("albumId");
  console.log(AlbumId);

  loadJSON(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${AlbumId}`
  ).then((res) => {
    console.log(res);

    // richiamo funzioni per popolare html
    headerAlbum(res);
    res.tracks.data.forEach((element) => {
      listaTracks(element);
      tracceAudio.push(element.preview);
      let tracce = document.querySelectorAll(".titolo");
      tracce[j].addEventListener("click", function () {
        let k = 0;
        for (let track of tracceAudio) {
          if (track == element.preview) {
            index = k;
          }
          k++;
        }
        console.log(index);
        playMusic(element.preview);
        nomeTraccia.innerText = element.title;
        nomeArtista.innerHTML = element.artist.name;
        imgCanzone.setAttribute("src", element.album.cover_small);
      });
      j++;
      i++;
    });

    console.log(tracceAudio);
    //funzione per riprodurre musica
    function playMusic(brano) {
      window.requestAnimationFrame(progress_animation);

      audio.setAttribute("src", brano);
      audio.play();
    }

    //al click del bottone pausa, ferma la canzone
    bottonePausa.addEventListener("click", function () {
      audio.pause();
    });
    //al click del bottone pausa, riprende la canzone dal punto in cui era ferma
    bottonePlay.addEventListener("click", function () {
      audio.play();
    });
    //quando la canzone è finita parte la successiva
    audio.addEventListener("ended", function () {
      index++;
      playMusic(tracceAudio[index]);
      nomeTraccia.innerText = res.tracks.data[index].title;
    });

    //bottone canzone successiva
    btn_succ.addEventListener("click", function () {
      index++;
      playMusic(tracceAudio[index]);
      nomeTraccia.innerText = res.tracks.data[index].title;
    });

    // bottone canzone precedente
    btn_prec.addEventListener("click", function () {
      index--;
      playMusic(tracceAudio[index]);
      nomeTraccia.innerText = res.tracks.data[index].title;
    });
    // modifica volume
    volume.addEventListener("change", function (e) {
      audio.volume = e.currentTarget.value / 100;
    });

    //bottone riproduzione tutte canzoni
    for (let play of verde) {
      play.addEventListener("click", function () {
        index = 0;
        playMusic(tracceAudio[0]);
        nomeTraccia.innerText = res.tracks.data[0].title;
        imgCanzone.setAttribute("src", res.tracks.data[0].album.cover_small);
        nomeArtista.innerHTML = res.tracks.data[0].artist.name;
      });
    }

    //tasto per loop
    /*ripeti.addEventListener('click', function () {
            if (!audio.paused) {
                console.log("Sta andando porcoddio");
                audio.loop;
            }
            else {
                console.log("Non sta andando madonna puttana");
          }
        })*/

    loadJSON(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${res.artist.id}/top?limit=50`
    ).then((res) => {
      console.log(res);
      let indexes = [];
      res.data.forEach((element) => {
        console.log(element.album.id);
        if (
          element.album.id != AlbumId &&
          !indexes.includes(element.album.id)
        ) {
          //if per non far uscire l'album della pagina corrente nella sezione ascolta anche
          renderAltriALbum(element);
          indexes.push(element.album.id);
        }
      });
    });
  });
};

window.addEventListener("scroll", () => {
  if (window.scrollY >= 400) {
    btn_play.classList.remove("invisibile");
  } else {
    btn_play.classList.add("invisibile");
  }
});

function progress_animation() {
  var rect = container.getBoundingClientRect();
  var percentage = audio.currentTime / audio.duration;
  elapsed.style.width = percentage * rect.width + "px";

  window.requestAnimationFrame(progress_animation);
}

function colora() {
  let i = document.querySelector(".bi-heart");
  i.style.color = "red";
}
