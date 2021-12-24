import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PokemonsService } from "../pokemons.service";

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.css']
})
export class AddPokemonComponent implements OnInit {
  @Input() pokemon : any;
  types: any = [];

  constructor(private route : ActivatedRoute, private router: Router,  private pokemonsService : PokemonsService) { }

  ngOnInit(): void {     
    let id = this.route.snapshot.params['2'];
    this.pokemonsService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
  }

}
