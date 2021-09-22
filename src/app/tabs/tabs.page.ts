import { Component, EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarroService } from '../servicios/carro.service';
import { ProductosService } from '../servicios/productos.service';
import { Producto } from '../Modelo/productos';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
plataforma:string 
  constructor(private platform:Platform, 
              private productoService:ProductosService,
              public carroService:CarroService,
              private router:Router) {
    this.plataforma = platform.platforms()[0]
    if (platform.isLandscape()) console.log('Paisaje')
    else console.log('Retrato')
  }

  verPedido()
  {
    console.log('Ver pedido!!')
    this.router.navigate(['tabs/tab1/pedido'])
  }

  buscar(dato:string)
  {
      //this.router.navigate(['tabs/tab1/buscar', dato])
      const hijos = this.productoService.instancias.find(x => x.codInst === 954).hijos

      dato = dato.toUpperCase()

      const producto = this.productoService.productos
          .filter(p => (p.marca.includes(dato) || p.codProd.includes(dato) || p.adicionales.descAmpliada.includes(dato) || p.descrip.includes(dato)) && !hijos.includes(p.codInst.toString()))

      const pulsos = this.productoService.productos
          .filter(p => (p.marca.includes(dato) || p.codProd.includes(dato) || p.adicionales.descAmpliada.includes(dato) || p.descrip.includes(dato)) && hijos.includes(p.codInst.toString()))

      console.log(`Total productos: ${producto.length}, total pulsos: ${pulsos.length}`)
      
      if (pulsos.length === 0)
      {
          this.router.navigate([`tabs/tab1/productos/4/`, dato])
      }
  }
}
