import { Injectable } from '@angular/core';
import { Carro } from '../Modelo/carro';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  pedido: Carro[] = []
  precioPedido: string = ''

  constructor(private http:HttpClient) { }
}
