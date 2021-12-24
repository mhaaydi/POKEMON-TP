import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../donnees-pokemons/pokemon';
import { PokemonsService } from '../pokemons.service';
import { Router } from '@angular/router';


@Component({
  selector: 'list-pokemons',
  templateUrl: './pokemons.component.html',
})
export class PokemonComponent implements OnInit{

    pokemons: Pokemon[];

    constructor(private router: Router, private pokemonsService : PokemonsService){
        this.pokemons = [];
    }

    ngOnInit(): void{
      this.pokemonsService.getPokemons().subscribe(pokemons => this.pokemons = pokemons);
      
    }

    selectPokemon(pokemon : Pokemon){
      let link = ['/pokemon', pokemon.id];
      this.router.navigate(link);
    }

}

