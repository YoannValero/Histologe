import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { SignaleRoutingModule } from "./signale-routing.module";
import { SignaleComponent } from "./signale.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SignaleRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        SignaleComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SignaleModule { }
