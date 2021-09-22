import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../Modelo/productos';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  productos: Producto[] = []
  resultado: Producto[] = []

  constructor(public productosService:ProductosService,
              private router:Router) {
    productosService.listaProductos()
      .subscribe((p:Producto[]) => this.productos = p)
  }

  buscar(dato: string)
  {   
    console.log(dato)
    this.resultado = []

    this.productos.forEach((p:any) => {
      console.log('El resultado es ',  p)
      if (p.descrip.toLowerCase().includes(dato.toLowerCase()) ||
          p.codProd.toLowerCase().includes(dato.toLowerCase())
      )
      {
          this.resultado.push(p)
      }
    })

  }

  mostrar(producto:string)
  {
    this.router.navigate(['tabs/tab1/detalle-producto/', producto])
  }

}
