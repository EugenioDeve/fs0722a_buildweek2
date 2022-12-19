async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

// variabili
let lista = document.querySelector("ol");
let i = 1;
let nomeArtista = document.querySelector(".nome-artista");
let fans = document.querySelector("#fans");
let cantante = document.querySelector("#cantante");
let imgBraniPiaciuti = document.querySelector("#img-braniPiaciuti");
let sfondo = document.querySelector("#sfondo");
let altriAlbum = document.getElementById("containerAlbum");
const albums = [
  "5327691",
  "363906907",
  "217489292",
  "359324967",
  "313482367",
  "65373012",
];

// variabili per footer
let btn_play = document.getElementById("play1");
let nomeArtist = document.querySelector("#nome-artista");
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
let tracce = document.querySelectorAll(".titolo");
let j = 0;
let index;
let numeriLike = document.getElementById("like");

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

// funzione per lista canzoni
function listaSongs(data) {
  let html = ` <li class="row border-bottom border-secondary align-items-center titolo hover">
    <div class="col-1 numero d-none d-md-inline">${i}</div>
    <div class="col-4 col-md-1 canzone">
        <img src="${data.album.cover_small}" alt="imgAlbum" class="">
    </div>
    <div class="col-8 col-md-6 ps-4">${data.title}</div>
    <div class="col-2 views d-none d-md-block">${data.rank}</div>
    <div class="col-2 durata d-none d-md-block">${convertiInMinuti(
      data.duration
    )}</div>
</li>`;
  lista.insertAdjacentHTML("beforeend", html);
}

// funzione per stampare album
function renderAlbum(data) {
  const html = `<a href="../albumPage/album.html?albumId=${data.album.id}" class="text-decoration-none text-white col-6 col-md-2 mb-4">
    <div class="card">
        <img src="${data.album.cover_medium}"
            class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text">${data.album.title}</p>
        </div>
    </div>
</a>`;
  altriAlbum.insertAdjacentHTML("beforeend", html);
  document.getElementById(
    "artista"
  ).textContent = `Discografia di ${data.artist.name}`;
}

// funzione asincrona on load per caricare tutto
window.onload = async () => {
  let url = new URLSearchParams(window.location.search);
  let id = url.get("artistId");
  console.log(id);
  loadJSON(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`
  ).then((res) => {
    console.log(res);
    fans.textContent = res.nb_fan + " Ascoltatori Mensili";
    cantante.textContent = `di ${res.name}`;
    nomeArtist.textContent = res.name;
    imgBraniPiaciuti.setAttribute("src", res.picture_small);
    sfondo.style.backgroundImage = `url('${res.picture_xl}')`;
    // richiamo funzioni per popolare html
  });

  //load JSON per caricare i 5 brani dell artista selezionato
  loadJSON(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`
  ).then((res) => {
    console.log(res);
    res.data.forEach((element) => {
      listaSongs(element);
      i++;
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
        nomeArtista.innerText = element.artist.name;
        imgCanzone.setAttribute("src", element.album.cover_small);
      });
      j++;
    });

    console.log(tracceAudio);
    //funzione per riprodurre musica
    function playMusic(brano) {
      window.requestAnimationFrame(progress_animation);
      imgCanzone.setAttribute("src", res.data[index].album.cover_small);
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

      nomeTraccia.innerText = res.data[index].title;
    });

    //bottone canzone successiva
    btn_succ.addEventListener("click", function () {
      index++;
      playMusic(tracceAudio[index]);

      nomeTraccia.innerText = res.data[index].title;
      imgCanzone.setAttribute("src", res.data[index].album.cover_small);
    });

    // bottone canzone precedente
    btn_prec.addEventListener("click", function () {
      index--;
      playMusic(tracceAudio[index]);

      nomeTraccia.innerText = res.data[index].title;
      imgCanzone.setAttribute("src", res.data[index].album.cover_small);
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
        nomeTraccia.innerText = res.data[0].title;
        imgCanzone.setAttribute("src", res.data[0].album.cover_small);
        nomeArtista.innerHTML = res.data[0].artist.name;
      });
    }
  });

  //Load JSON per la sezione altri album dell'artista
  loadJSON(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`
  ).then((res) => {
    console.log(res);
    let indexes = [];

    // togliere doppioni album
    res.data.forEach((element) => {
      if (!indexes.includes(element.album.id)) {
        renderAlbum(element);
        indexes.push(element.album.id);
      }
    });
  });

  numeriLike.innerText = `Hai messo mi piace a ${Math.round(
    Math.random() * 33
  )} brani`;
};

function progress_animation() {
  var rect = container.getBoundingClientRect();
  var percentage = audio.currentTime / audio.duration;
  elapsed.style.width = percentage * rect.width + "px";

  window.requestAnimationFrame(progress_animation);
}

function playMusic(brano) {
  window.requestAnimationFrame(progress_animation);

  audio.setAttribute("src", brano);
  audio.play();
}
