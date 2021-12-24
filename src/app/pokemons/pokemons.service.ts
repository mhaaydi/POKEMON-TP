import { Injectable } from "@angular/core";

import { POKEMONS } from "./donnees-pokemons/mock-pokemons"; 
import { Pokemon } from "./donnees-pokemons/pokemon";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";


@Injectable()
export class PokemonsService{

  constructor(private http: HttpClient){}

  private pokemonsUrl = 'api/pokemons';

  private log(log: string){
    console.info(log);
  }

  deletePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${pokemon.id}`
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<Pokemon>(url, httpOptions).pipe(
        tap(_ => this.log(`delete pokemon id=${pokemon.id}`)),
        catchError(this.handleError<Pokemon>('deletePokemon'))
    )
}

  private handleError<T>(operation='operation', result?: T){
    return (error: any): Observable<T> =>{
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  //Le Pipe async est un pipe capable de consommer des Observables en appelant implicitement la méthode suscribe afin de récupérer les valeurs contenus dans l'observable
  //Retourne tous les pokémons
  getPokemons(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      tap(_ => this.log(`fetched pokemons`)),
      catchError(this.handleError(`getPokemons`, []))
    );
  }

  //Retoune le pokémon avec l'identifiant passé en paramètre
  getPokemon(id: number): Observable<Pokemon>{
    const url = `${this.pokemonsUrl}/${id}`;

    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id = ${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }
  //Modification d'un pokemon
  updatePokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    };
    
    return this.http.put<Pokemon>(this.pokemonsUrl, pokemon, httpOptions).pipe(
      tap(_=> this.log(`upated pokemon id=${pokemon.id}`)),
      catchError(this.handleError<any>('updatePokemon'))
    );
  }
  AddPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json'})
    };
    
    return this.http.post<Pokemon>(this.pokemonsUrl, pokemon, httpOptions).pipe(
      tap(_=> this.log(`added pokemon id=${pokemon.id}`)),
      catchError(this.handleError<any>('AddPokemon'))
    );
  }

  getPokemonTypes(): string[]{
    return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol'];
  }



}