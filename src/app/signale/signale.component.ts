import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "Signale",
    templateUrl: "./signale.component.html",
    styleUrls: ["./signale.component.css"]
})
export class SignaleComponent implements OnInit {

    @ViewChild("name",{static:false}) protected name: ElementRef;
    @ViewChild("description",{static:false}) protected description: ElementRef;
    @ViewChild("prix",{static:false}) protected prix: ElementRef;
    @ViewChild("categories_id",{static:false}) protected categories_id: ElementRef;

    constructor(private http: HttpClient) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    /**
     * Requête POST / soumissions du formulaire 
     */
    submitForm() {
        let name = { nom: this.name.nativeElement.text };
        let description = {description: this.description.nativeElement.text };
        let prix = { prix: this.prix.nativeElement.text };
        let categories_id = {categories_id: this.categories_id.nativeElement.text };

        var obj = Object.assign(name, description, prix, categories_id);

        this.http.post("http://yoannvalero.ovh/produits/creer.php", obj).toPromise().then ( (data) => {
            console.log(data);
        })
    }
    /**
     * Ecoute les changements de valeurs des champs Imput
     * exemple dans signale.component.html: <TextField #name (textChange)="onTextChange(name.text)" hint='nom'></TextField>
     * @param input
     */
    onTextChange(input) {
        //console.log(input);
    }
}
