import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import { prompt, inputType } from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'Connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {

    }

    onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
    }

    forget() {
        prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register to reset your password.",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel",
            inputType: inputType.email
        }).then((data) => {
            // if (data.result) {
            //     this..forgetPassword(data.text.trim())
            //         .then(() => {
            //             alert("An email has been sent to your email address. Please check your email for instructions on resetting your password.");
            //         }, () => {
            //             alert("Unfortunately, an error occurred resetting your password.");
            //         });
            // }
            console.log(data);

        });
    }
}
