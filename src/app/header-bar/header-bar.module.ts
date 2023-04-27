import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './header-bar.component';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ HeaderBarComponent ],
  imports: [
    CommonModule,
    IonicModule,
    MatIconModule
  ],
  exports: [ HeaderBarComponent ]
})
export class HeaderBarModule { }
