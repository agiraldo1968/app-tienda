import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/Modelo/productos';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
codigo:string
producto:Producto
auxiliares:Producto[] = []
imgAdicionales:string[] = []

esDetalle = true
esDescripcion = false

rutaImagenes:string = ''

opciones = {
  slidesPerView: 3.5,
  grabCursor: true,
  freeMode: true,
  direction: "vertical"
}

opcionesAux = {
  slidesPerView: 5.5,
  grabCursor: true,
  freemode: true,
}

  constructor(private router:Router, public productoService:ProductosService) 
  { 
    const partes = router.url.split('/')
    this.codigo = partes[partes.length-1]
    this.rutaImagenes = productoService.rutaImagenes
  }

  ngOnInit() {
    
    console.log('Buscando detalle para ', this.codigo)
    
    this.productoService.listaProductos().
    subscribe((p:Producto[]) => {
          this.producto = p.find(x => x.codProd === this.codigo)

          console.log('Imágenes adicionales', this.producto.imagenes.adicionales)

          if (this.producto.imagenes.adicionales.length > 0)
          {
              this.imgAdicionales = this.producto.imagenes.adicionales.split(';')
          }

          this.auxiliares = this.productoService.listaProductosAuxiliar(this.producto.codigoAux, this.producto.codProd)
        })
  }

  verDetalle()
  {
    this.esDetalle = true
    this.esDescripcion = false
  }

  verAmpliada()
  {
    this.esDetalle = false
    this.esDescripcion = true
  }

  cambiarImagen(producto:Producto)
  {
    console.log('Cambiando a ... ',producto)
    this.producto = producto

    this.imgAdicionales = []

    if (this.producto.imagenes.adicionales.length > 0)
    {
        this.imgAdicionales = this.producto.imagenes.adicionales.split(';')
    }
  }

  verAdicional(adicional)
  {
    console.log('Adicional....',adicional)
    this.producto = {
      ...this.producto,
      imagenes: {
        ...this.producto.imagenes,
        principal: adicional
      }
    }
  }
}