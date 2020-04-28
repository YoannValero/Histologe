import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { HttpClient } from "@angular/common/http";
import { MyHttpPostService } from "../services/http-post.service";


@Component({
    selector: "Contact",
    templateUrl: "./contact.component.html",
})
export class ContactComponent implements OnInit {

    constructor(public http : HttpClient, public myPostService: MyHttpPostService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    postContact() {
        // this.sign.push(this.myPostService.signalement);
        // console.log(this.sign);

        this.myPostService
            .postData(this.myPostService.contact)
            .toPromise().then( (data) => {
                console.log("Réponse du serveur : \n" + JSON.stringify(data));
            })
    }
}
