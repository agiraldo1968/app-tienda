import { Pipe, PipeTransform } from '@angular/core';
import { ProductosService } from '../servicios/productos.service';

@Pipe({
  name: 'adicionales'
})
export class AdicionalesPipe implements PipeTransform {

  constructor(private productosService: ProductosService) {}

  transform(imagen: string): string {

    const producto = this.productosService.productos.find(x => x.imagenes.adicionales.includes(imagen))
    const pulsos = this.productosService.instancias.find(x => x.codInst === 954).hijos

    let ruta = pulsos.includes(producto.codInst.toString()) ? this.productosService.rutaPulsos : this.productosService.rutaImagenes

    ruta = imagen[imagen.length - 6] === '-' ? ruta += 'adicionales/' : ruta

    return `${ruta}${imagen}`
  }

}
