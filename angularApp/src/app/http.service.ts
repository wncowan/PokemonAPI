import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(private _http: HttpClient) {
        this.getPokemon();
        this.getPokemonWithAbility();
        console.log("ran getPokemon()")
    }
    getPokemon() {
        let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');

        bulbasaur.subscribe(data => {
            console.log("Got our Pokemon Finally!", data);
            console.log("abilities:", data["abilities"]);
            let bulbasaur_abilities = [];
            let ability1 = data["abilities"][0]["ability"]["name"];
            let ability2 = data["abilities"][1]["ability"]["name"];
            console.log("bulbasaur_abilities: ", ability1, ability2)
        });
    }

    getPokemonWithAbility(){
        let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
        bulbasaur.subscribe(data => {
            let ability1 = data["abilities"][0]["ability"];
            let ability2 = data["abilities"][1]["ability"];
            let ability1URL = this._http.get(`${ability1.url}`);
            ability1URL.subscribe(abilityData =>{
                console.log(`${abilityData["pokemon"].length} pokemon share ability 1`)
            })
            let ability2URL = this._http.get(`${ability2.url}`);
            ability2URL.subscribe(abilityData =>{
              console.log(`${abilityData["pokemon"].length} pokemon share ability 2`)
            })
      });
    }
}


