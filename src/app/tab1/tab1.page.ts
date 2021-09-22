import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Instancia, Producto } from '../Modelo/productos';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnDestroy {
  instancias:Instancia[] = []
  marcas:string[] =  []
  pulsos:Instancia[] = []
  verInstancias = false
  verMarcas = false
  verPulsos = false
  verTransito = false

  esProducto:boolean = true

  opciones = ['Categorías', 'Marcas', 'Pulsos', 'Tránsito']

  @ViewChild('opcion', {static:false}) opcion: ElementRef<any>

  suscripcion:Subscription

  constructor(public productoService:ProductosService, private router:Router) {}

  ngOnDestroy(): void {
    console.log('Adiós mundo cruel!!')
  }

  rbCategorias()
  {
    this.instancias = []
    this.esProducto = true
  }

  rbPulsos()
  {
    this.instancias = []
    this.esProducto = false
  }
  
  listarCategorias()
  {
      this.verInstancias = true
      this.verMarcas = false 
      this.verPulsos = false
    
    
      if (this.instancias.length === 0)
      {
        this.productoService.listaInstancias()
          .subscribe((d:Instancia[]) => {
            if (this.esProducto)
            {
                this.instancias = d.filter(i => i.insPadre === 0 && i.codInst !== 954).sort((a,b) => a.descrip.localeCompare(b.descrip))
            }
            else
            {
                this.instancias = d.filter(i => i.insPadre === 954).sort((a,b) => a.descrip.localeCompare(b.descrip))              
            }
          })
      }

  }

  verCategoria(categoria: number)
  {
    const tipo = this.esProducto ? 0 : 1

    this.router.navigate([`tabs/tab1/productos/${tipo}/`, categoria])
  }

  listarMarcas()
  {
    this.verMarcas = true
    this.verInstancias = false
    this.verPulsos = false

    const pulsos = this.productoService.instancias.find(x => x.codInst === 954).hijos
    let hijos = pulsos

    if (this.esProducto)
    {
      hijos = ''
      this.productoService.instancias.forEach(x => {
        if (x.insPadre === 0 && !pulsos.includes(x.codInst.toString()))
        {
            hijos += x.hijos + ','
        }
      })
    }

    console.log(hijos)
    this.marcas = []

    this.marcas = this.productoService.listaMarcas(hijos)
  }

  verMarca(marca:string)
  {
    const tipo = this.esProducto ? 2 : 3

    this.router.navigate([`tabs/tab1/productos/${tipo}/`, marca])
  }

  listarTransito()
  {
    this.verInstancias = false
  }
}
