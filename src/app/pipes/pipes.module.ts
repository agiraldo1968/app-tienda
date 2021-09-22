import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenesPipe } from './imagenes.pipe';
import { AdicionalesPipe } from './adicionales.pipe';



@NgModule({
  declarations: [
    ImagenesPipe,
    AdicionalesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdicionalesPipe,
    ImagenesPipe
  ]
})
export class PipesModule { }
