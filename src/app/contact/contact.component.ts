import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { HttpClient } from "@angular/common/http";
import { MyHttpPostService } from "../services/http-post.service";
import { ValidateurService } from "../services/validateur.service";


@Component({
    selector: "Contact",
    templateUrl: "./contact.component.html",
})
export class ContactComponent implements OnInit {

    constructor(public http : HttpClient, public myPostService: MyHttpPostService, private validateur : ValidateurService) {
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
    verifField() {
        let contact = this.myPostService.contact
        // this.validateur.isEmail(contact.email, "Votre email n'est pas valide");
        this.validateur.isAlpha(contact.sujet, "Votre sujet n'est pas valide", "sujet");
        this.validateur.isAlpha(contact.message, "Votre message n'est pas valide", "message");
    }
}
