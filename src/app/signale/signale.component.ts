import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "Signale",
    templateUrl: "./signale.component.html",
    styleUrls: ["./signale.component.css"]
})
export class SignaleComponent implements OnInit {

    postData = {
        nom:'test2',
        description:'test',
        prix:10,
        categories_id:5
    }

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

    submitForm() {
        this.http.post("http://yoannvalero.ovh/produits/creer.php", this.postData).toPromise().then ( (data) => {
            console.log(data);
        })
    }


}
