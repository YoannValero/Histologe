import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SignaleRoutingModule } from "./signale-routing.module";
import { SignaleComponent } from "./signale.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SignaleRoutingModule
    ],
    declarations: [
        SignaleComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SignaleModule { }
