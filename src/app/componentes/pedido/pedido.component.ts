import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../Modelo/productos';
import { Carro } from '../../Modelo/carro';
import { CarroService } from '../../servicios/carro.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {
  carro: Carro
  cantidadPedir:string = ''

  precioMostrar:number = 0
  @Input() producto: Producto

  constructor(private carroService: CarroService) { }

  ngOnInit() {
  
  }

  agregar()
  {
      if (this.cantidadPedir.length > 0)
      {
          this.carro = {
            codprod: this.producto.codProd,
            descrip: this.producto.descrip,
            cantidad: Number(this.cantidadPedir),
            precio: Number(this.precioMostrar),
            imagen: this.producto.imagenes.principal
          }
    
          this.carroService.pedido.push(this.carro)
          this.cantidadPedir = ''
      }
      else 
      {
          console.log('No hay nada pa pedir')
      }
  }

  mostrarPrecio(evento?)
  {
      if (evento)
      {
          console.log('Mostrando precio ', evento.target.value)
          this.cantidadPedir = evento.target.value
          
      }

      switch(this.carroService.precioPedido)
      {
          case '1':
            this.precioMostrar = this.producto.precio1
            break;
          case '2':
            this.precioMostrar = this.producto.precio2
            break;
          case '3':
            this.precioMostrar = this.producto.precio3
            break;
          case '4':
            this.precioMostrar = this.producto.adicionales.precio_4
            break;
      }

      console.log('Mostrando el precio ', this.precioMostrar)
  }

  verSeleccion(numero: string)
  {
      this.carroService.precioPedido = numero

      if (this.cantidadPedir.length > 0)
      {
          this.mostrarPrecio()
      }
  }

}
