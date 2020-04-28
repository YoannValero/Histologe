import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ContactRoutingModule } from "./contact-routing.module";
import { ContactComponent } from "./contact.component";

import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ContactRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        ContactComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ContactModule { }
