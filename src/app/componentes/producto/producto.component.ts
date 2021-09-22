import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/Modelo/productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent {

  @Input() producto:Producto
  @Input() rutaImagenes:string
  @Input() verPedido:boolean = true

  constructor(private router:Router) { }

  verDetalle(producto:string)
  {
    this.router.navigate(['tabs/tab1/detalle-producto/', producto])
  }    

}
