import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ImageSource, fromBase64, fromFile } from "tns-core-modules/image-source";
import { Image } from "tns-core-modules/ui/image";

@Component({
    selector: "Apropos",
    templateUrl: "./apropos.component.html",
    styleUrls: ["./apropos.component.css"]

})
export class AproposComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
