import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(private http:HttpClient) { }

  listaColores()
  {
      return this.http.get('assets/datos/precios.json')
  }
}
