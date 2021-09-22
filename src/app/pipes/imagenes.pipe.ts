import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../Modelo/productos';
import { ProductosService } from '../servicios/productos.service';

@Pipe({
  name: 'imagenes'
})
export class ImagenesPipe implements PipeTransform {

  constructor(private productosService:ProductosService) { }

  transform(producto:Producto, esTextura:boolean = false ): string {
    
     const pulsos = this.productosService.instancias.find(x => x.codInst === 954).hijos

     let ruta = pulsos.includes(producto.codInst.toString()) ? this.productosService.rutaPulsos : this.productosService.rutaImagenes

     ruta = producto.imagenes.principal[producto.imagenes.principal.length - 6] === '-' ? ruta + 'adicionales/' : ruta

     return `${ruta}${producto.imagenes.principal}`
  }

}
