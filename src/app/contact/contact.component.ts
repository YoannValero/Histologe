import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Signal } from "../modeles/Signal";

@Component({
    selector: "Contact",
    templateUrl: "./contact.component.html",
})
export class ContactComponent implements OnInit {

    private _signal: Signal;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this._signal = new Signal("John", 18, "john@company.com", "New York", "5th Avenue", 11);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    get person(): Signal {
        return this._signal;
    }
}
