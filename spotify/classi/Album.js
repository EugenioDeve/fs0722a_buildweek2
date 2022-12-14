

import { Artista } from "./Artista.js";
class Album {
    constructor(id, title, canzoni, img, color, artista/*Classe Artista*/) {
        this.id = id;
        this.title = title;
        this.canzoni = canzoni;
        this.img = img;
        this.artista = artista;
        this.color = color;
    }
}

export { Album };




