import { Component, OnInit } from '@angular/core';
import { Carro } from '../../Modelo/carro';
import { CarroService } from '../../servicios/carro.service';
import { ProductosService } from '../../servicios/productos.service';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss'],
})
export class CarroComponent implements OnInit {

  carro: Carro[] = []
  rutaImagenes:string = this.productoService.rutaImagenes

  constructor(private carroService: CarroService, private productoService:ProductosService) { }

  ngOnInit() {
    this.carro = this.carroService.pedido
  }

  retirar(item:Carro)
  {
      console.log('Pa fuera con ', item)
      this.carro = this.carro.filter(c => c.codprod !== item.codprod)
  }

}
