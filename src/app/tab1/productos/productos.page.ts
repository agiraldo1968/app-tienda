import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Instancia, Producto } from 'src/app/Modelo/productos';
import { ProductosService } from 'src/app/servicios/productos.service';
import { Generica } from '../../Modelo/varios';
      
@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit, OnDestroy {
  productos:Producto[] = []
  tipo: string
  parametro: string
  hijos: string
  marca: string
  rutaImagenes: string = this.productosService.rutaImagenes
  instancias: Instancia[] = []

  pos = 0

  verClase:boolean = false
  verTipo:boolean = false
  esBateria:boolean = false

  listaClases:Generica[] = []
  listaTipos:Generica[] = []

  instanciasBaterias:string
  claseSeleccionada:number
  tipoSeleccionado:number
  instanciaSeleccionada:number 

  public suscripcion: Subscription

  opciones = {
    slidesPerView: 5.6,
    grabCursor: true,
    freeMode: true
  }

  constructor(private router: Router, private productosService:ProductosService) { 

    let partes = router.url.split('/')
    this.tipo = partes[partes.length-2]
    this.parametro = partes[partes.length-1]
    this.productos = []

    //if (this.tipo != '4')
    {
        this.cargarLista(this.parametro)
    }
  }
  
  cargarLista(padre:string)
  {
      switch (this.tipo) {
        case "0":
        case "1":
            this.hijos = this.productosService.instancias.find(x => x.codInst === parseInt(padre)).hijos
            this.instanciasBaterias = this.productosService.instancias.find(y => y.codInst === 956).hijos

            this.instancias = this.productosService.instancias.filter(x => x.insPadre === parseInt(padre))

            this.esBateria = this.instanciasBaterias.includes(padre)

            if (this.esBateria)
            {
                this.listaClases = this.productosService.listaClasesBateria
                this.listaTipos = this.productosService.listaTiposBateria
            }
          break;
        case "2":
        case "3":
            if (this.tipo === "2")
            {
              const pulsos = this.productosService.instancias.find(x => x.codInst === 954).hijos
              this.hijos = ''
              this.productosService.instancias.forEach(x => {
                if (x.insPadre === 0 && !pulsos.includes(x.codInst.toString()))
                {
                    this.hijos += x.hijos + ','
                }
              })
            }
            else
            {
              this.hijos = this.productosService.instancias.find(x => x.codInst === 954).hijos
            }
    
            this.marca = this.parametro
            break
        default:
          this.hijos = ''
          this.instancias = []
          break;
      }
  }

  ngOnDestroy(): void {
  }


  ngOnInit() {
      this.productos = []
      this.cargarProductos()
  }

  cargarProductos(event?)
  {
    this.rutaImagenes = (this.tipo == "1" || this.tipo == "3") ? this.productosService.rutaPulsosAdicionales : this.productosService.rutaImagenes

    let existe = false

    switch (this.tipo) {
      case "0":
      case "1":
        this.productosService.listaProductosCategoria(this.hijos).slice(this.pos, this.pos + 12).forEach(p => {
          this.productos.push(p)
          existe = true
        })
        break;
      case "2":
      case "3":
          this.productosService.listaProductosMarca(this.marca, this.hijos).slice(this.pos, this.pos + 12).forEach(p => {
            this.productos.push(p)
            existe = true
          })
      break;
      case "4":
        this.productosService.listaProductosValor(this.parametro.toUpperCase()).slice(this.pos, this.pos + 12).forEach(p => {
          this.productos.push( p )
          existe = true
        })
        break;
    }

    if (!existe)
    {
        event.target.disabled = true
        event.target.complete()
        return        
    }

    this.pos += 12

    if (event)
    {
        event.target.complete()
    }
  }

  cargarInstancia(instancia:Instancia)
  {
    this.cargarLista(instancia.codInst.toString())
    this.productos = []
    this.pos = 0
    this.cargarProductos()
  }

  cambioInstancia()
  {
    this.cargarLista(this.instanciaSeleccionada.toString())
    this.productos = []
    this.pos = 0
    this.cargarProductos()
  }

  cambioClase()
  {
      console.log('Por lo menos hace algo', this.claseSeleccionada)
  }

  cambioTipo()
  { 
      console.log(this.tipoSeleccionado)
  }
}
