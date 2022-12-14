async function loadJSON(url) {
    const res = await fetch(url);
    return await res.json();
}

window.onload = async () => {
    let url = new URLSearchParams(window.location.search)
    let id = url.get("artistId");
    console.log(id)
}