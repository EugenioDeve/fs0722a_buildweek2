async function loadJSON(url) {
    const res = await fetch(url);
    return await res.json();
}
let id = 412
loadJSON('https://striveschool-api.herokuapp.com/api/deezer/artist/' + id).then(data => {
    console.log(data)
}) 
