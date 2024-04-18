import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) {
  }
    //Metodo de obtener los pokemons
  getPokemon(index: any){
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }
}
