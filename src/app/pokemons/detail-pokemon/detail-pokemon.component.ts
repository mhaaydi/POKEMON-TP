import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../donnees-pokemons/pokemon';
import { PokemonsService } from '../pokemons.service';
// Importation du router pour les liens
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'detail-pokemon',
  templateUrl: './detail-pokemon.component.html'
})
export class DetailPokemonComponent implements OnInit{
  
  pokemon: any = null;
  items: any =null;


  constructor(private route : ActivatedRoute, private router: Router, private pokemonsService : PokemonsService){
  
  }

  ngOnInit(): void {    
    let id = this.route.snapshot.params['id'];
    this.pokemonsService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
  }


  goBack(): void{
    this.router.navigate(['/pokemon/all']);
  }

  createRange(number :number){
    this.items = [];
    for(var i = 1; i <= number; i++){
       this.items.push(i);
    }
    return this.items;
  }

  goEdit(pokemon : Pokemon): void{
    let link = ['pokemon/edit', pokemon.id];
    this.router.navigate(link);
  }
  delete(pokemon: Pokemon): void {
    this.pokemonsService.deletePokemon(pokemon)
        .subscribe(_ => this.goBack());
}
  

}