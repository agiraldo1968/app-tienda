import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../Modelo/productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit, AfterContentInit {
  
  produtos:Producto[] = []
  valorBuscar:string = ''

  constructor(public productoService:ProductosService,
              private router:Router)   
  { 
      const partes:string[] = router.url.split('/')
      this.valorBuscar = partes[partes.length - 1]
  }

  ngAfterContentInit(): void {

  }
  
  
  ngOnInit() 
  {
      this.mostrarResultados()
  }

  mostrarResultados()
  {
      this.productoService.listaProductosValor(this.valorBuscar).forEach(p => {
               this.produtos.push( p )
      })
  }

}
