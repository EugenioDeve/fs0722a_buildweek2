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



async function loadJSON(url) {
    const res = await fetch(url);
    return await res.json();
}

// funzione per creare elemento buonasera
function articleBuonasera(data) {
    const html = `
    <a href="#" class="text-light text-decoration-none">
    <div class="p-2 col-4">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="${data.cover_small}"
            class="img-fluid rounded-start w-75" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body mt-3">
            <h5 class="card-title">${data.title}</h5>

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


    articleBuonasera(data)
})



async function prova1(url) {
    try {
        loadJSON(`https://striveschool-api.herokuapp.com/api/deezer/album/${url}`).then(data => {
            console.log(data)
            articleBuonasera(data)
        })
    } catch (err) { console.error(`${err}`) }
}

prova1(albums[3])