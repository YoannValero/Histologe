import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { MyHttpPostService } from "./services/http-post.service";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { RadioButtonModule } from '@webileapps/nativescript-radiobutton/angular'


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptHttpClientModule,
        HttpClientModule,
        NativeScriptUIDataFormModule,
        NativeScriptFormsModule,
        RadioButtonModule,

    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers :[
        MyHttpPostService,
        ModalDialogService
    ]
})
export class AppModule { }
