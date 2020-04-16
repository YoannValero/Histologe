import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SignaleRoutingModule } from "./signale-routing.module";
import { SignaleComponent } from "./signale.component";

import { HttpClientModule } from "@angular/common/http";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SignaleRoutingModule,
        HttpClientModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        SignaleComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SignaleModule { }
