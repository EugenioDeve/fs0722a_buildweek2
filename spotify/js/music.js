let nomeTraccia = document.querySelector(".nome-traccia");
let nomeArtista = document.querySelector(".nome-artista");

let btn_succ = document.querySelector(".traccia-succ");
let btn_prec = document.querySelector(".traccia-prec");
let btn_playpausa = document.querySelector(".playpause");

// creiamo un elemento canzone per il player
let tracci_corrente = document.createElement("canzone");
function cariCanzone() {
    fetch('https://striveschool-api.herokuapp.com/api/deezer/album/75621062').then(function (response) {
        return response.json();

    }).then(function (json) {
        var listaTraccie = json.tracks.data;

        btn_playpausa.addEventListener('click', () => {
            playpauseTrack();
        })

    })


}