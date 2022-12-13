async function loadJSON(url) {
    const res = await fetch(url);
    return await res.json();
}

loadJSON('./json/album-json.JSON').then(data => {

})