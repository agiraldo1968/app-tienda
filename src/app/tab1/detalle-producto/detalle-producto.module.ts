import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleProductoPageRoutingModule } from './detalle-producto-routing.module';

import { DetalleProductoPage } from './detalle-producto.page';
import { ImagenesPipe } from 'src/app/pipes/imagenes.pipe';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentesModule } from '../../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    DetalleProductoPageRoutingModule,
    PipesModule
  ],
  declarations: [DetalleProductoPage]
})
export class DetalleProductoPageModule {}
