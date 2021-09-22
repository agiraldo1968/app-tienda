import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Instancia, Producto } from '../Modelo/productos';
import { environment } from 'src/environments/environment';
import { Generica } from '../Modelo/varios';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

instancias:Instancia[] = []
productos:Producto[] = []
marcas:string[] = []
rutaImagenes:string
rutaAdicionales: string

rutaPulsos:string
rutaPulsosAdicionales:string

listaClasesBateria:Generica[] = [];
listaTiposBateria:Generica[] = [];

paginaActual = 0

  constructor(private http: HttpClient) 
  { 
    this.rutaImagenes = environment.rutaImagenes
    this.rutaAdicionales = environment.rutaImagenes + 'adicionales/'

    this.rutaPulsos = environment.rutaPulsos
    this.rutaPulsosAdicionales = environment.rutaPulsos + 'adicionales/'

    this.listaInstancias().subscribe((i:Instancia[]) => {
      this.instancias = i
    })

    this.listaProductos().subscribe((p:Producto[]) => {
      this.productos = p
    })

    this.listarClasesBateria().subscribe((c:Generica[]) => {
        this.listaClasesBateria = c
    })

    this.listarTiposBateria().subscribe((t:Generica[]) => {
        this.listaTiposBateria = t
    })
  }

  listaProductos()
  {
    return this.http.get('assets/modelo/productos.json')
  }

  listaInstancias()
  {
    return this.http.get('assets/modelo/instancias.json')
  }

  listarClasesBateria()
  {
      return this.http.get('assets/modelo/claseBateria.json')
  }

  listarTiposBateria()
  {
      return this.http.get('assets/modelo/tipoBateria.json')
  }

  listaProductosMarca(marca:string, lista: string)
  {
      let resultado:Producto[] = []

      this.productos.filter(x => x.marca === marca && lista.includes(x.codInst.toString())).forEach(p => {
        if (resultado.filter(r => r.codigoAux === p.codigoAux).length === 0)
        {
            resultado.push(p)
        }
      })

      return resultado
  }

  listaProductosCategoria(lista:string)
  {
      let resultado:Producto[] = []

      this.productos.filter(x => lista.includes(x.codInst.toString())).forEach(p => {
        if (resultado.filter(r => r.codigoAux === p.codigoAux).length === 0)
        {
          if (!resultado.find(s => s.codigoAux === p.codigoAux))
          {
            resultado.push(p)
          }
        }
      })

      console.log('Servicio ', resultado)
      return resultado
  }

  listaMarcas(lista: string)
  {
    this.marcas = []
    this.productos.filter(x => lista.includes(x.codInst.toString())).forEach(m => {
      if (!this.marcas.includes(m.marca))
      {
          this.marcas.push(m.marca)
      }
    })

    return this.marcas.sort()
  }

  listaProductosAuxiliar(codigoAux:string, codigo:string)
  {
    return this.productos.filter(x => x.codigoAux === codigoAux && x.codProd !== codigo)
  }

  listaProductosValor(valor:string)
  {
    valor = valor.toUpperCase()

    let resultado:Producto[] = []

    this.productos
               .filter(x => x.marca.toUpperCase().includes(valor) || 
                            x.descrip.toUpperCase().includes(valor) || 
                            x.adicionales.descAmpliada.toUpperCase().includes(valor) ||
                            x.codProd.toUpperCase().includes(valor))
                .forEach(p => {
                  if (resultado.filter(r => r.codigoAux === p.codigoAux).length === 0)
                  {
                    if (!resultado.find(s => s.codigoAux === p.codigoAux))
                    {
                      resultado.push(p)
                    }
                  }
                })

    return resultado
  }
}
