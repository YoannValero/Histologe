import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ConnexionRoutingModule } from './connexion-routing.module';
import { ConnexionComponent } from './connexion.component';



@NgModule({
  declarations: [
    ConnexionComponent
  ],
  imports: [
    NativeScriptCommonModule,
    ConnexionRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ConnexionModule { }
