import {Component, OnInit, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {
    MatCell, MatCellDef,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
    MatTable,
    MatTableDataSource
} from "@angular/material/table";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {PokemonService} from "../../services/pokemon.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-poke-table',
  standalone: true,
  imports: [
      MatFormField,
      MatInput,
      MatTable,
      MatColumnDef,
      MatHeaderCellDef,
      MatCell,
      MatCellDef,
      MatHeaderRow,
      MatHeaderRowDef,
      MatRow,
      MatRowDef,
      MatNoDataRow,
      MatPaginator,
      MatLabel
  ],
  templateUrl: './poke-table.component.html',
  styleUrl: './poke-table.component.css'
})
export class PokeTableComponent implements OnInit{
  displayedColumns: string[] = ['position', 'image', 'name'];
  //Array para almacenar los datos de los pokémon
  data: any[] = [];
  //Creación de una instancia de MatTableDataSource con sus datos
  dataSource: MatTableDataSource<any, MatPaginator> = new MatTableDataSource<any>(this.data);
  //Para acceder al paginator de la tabla desde la plantilla
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;

  pokemons :any =[];
  constructor(private pokemonService: PokemonService, private router: Router) {
  }
  //Se ejecuta al iniciar el componente
  ngOnInit() {
    this.getPokemons()
  }
    getPokemons(){
        let pokemonData;
        for (let i= 1;i<=151;i++){
            this.pokemonService.getPokemon(i).subscribe(
                res =>{
                    //Crear y llenar un objeto con datos relevantes que me solicitan
                    pokemonData={
                        position : i,
                        image : res.sprites.front_default,
                        name : res.name
                    };
                    //Añadir cada objeto de Pokémon al array de datos y actualizar el dataSource
                    this.data.push(pokemonData);
                    this.dataSource = new MatTableDataSource<any>(this.data);
                    this.dataSource.paginator = this.paginator;
                },
                error => {

                    console.log(error);
                }
            );
        }
    }
    applyFilter( event: Event){
        const inputElement = event.target as HTMLInputElement;
        const filteredValue = inputElement.value.replace(/[^a-zA-Z ]/g,'' ); //Remueve caracteres no deseados
        inputElement.value =filteredValue; //Establece el valor filtrado
        this.dataSource.filter = filteredValue.trim().toLowerCase();
        //Regresar al inicio del paginador si se aplica un filtro
        if(this.dataSource.paginator){
            this.dataSource.paginator.firstPage();
        }
    }
    getRow(row: any){
        this.router.navigateByUrl(`/pokeDetail/${row.position}`);
    }

}
