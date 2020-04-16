import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AproposRoutingModule } from "./apropos-routing.module";
import { AproposComponent } from "./apropos.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AproposRoutingModule
    ],
    declarations: [
        AproposComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AproposModule { }
