import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto/producto.component';
import { PedidoComponent } from './pedido/pedido.component';
import { CarroComponent } from './carro/carro.component';
import { PrecioComponent } from './precio/precio.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [ProductoComponent, PedidoComponent, CarroComponent, PrecioComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule
  ],
  exports: [ProductoComponent, PedidoComponent, CarroComponent, PrecioComponent]
})
export class ComponentesModule { }
