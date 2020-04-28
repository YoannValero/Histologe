import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SignaleRoutingModule } from "./signale-routing.module";
import { SignaleComponent } from "./signale.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { RadioButtonModule } from '@webileapps/nativescript-radiobutton/angular';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SignaleRoutingModule,
        HttpClientModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        RadioButtonModule
    ],
    declarations: [
        SignaleComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SignaleModule { }
