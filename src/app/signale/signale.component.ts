import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { MyHttpPostService } from "../services/http-post.service";
import { HttpClient } from "@angular/common/http";
import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";

import { EventData } from "tns-core-modules/ui/page/page";
import { Button } from "tns-core-modules/ui/button";
import { Observable } from 'rxjs';
import { Page } from "tns-core-modules/ui/page";

import * as imageSourceModule from "tns-core-modules/image-source";
import { takePicture, requestCameraPermissions } from "nativescript-camera";
var fs = require("file-system");
//let imagepicker = require("nativescript-imagepicker");

@Component({
    selector: "Signale",
    templateUrl: "./signale.component.html",
    styleUrls: ["./signale.component.css"],
    providers: [MyHttpPostService]
})
export class SignaleComponent implements OnInit {

    //@ViewChild("nom",{static:false}) protected nom: ElementRef;
    //@ViewChild("description",{static:false}) protected description: ElementRef;
    //@ViewChild("prix",{static:false}) protected prix: ElementRef;
    //@ViewChild("categories_id",{static:false}) protected categories_id: ElementRef;

    //@ViewChild("courriel",{static:false})  courriel :ElementRef;
    //@ViewChild("description",{static:false})  description :ElementRef;
    //@ViewChild("telephone",{static:false})  telephone :ElementRef;
    //@ViewChild("proprio_info",{static:false})  proprio_info :ElementRef;
    //@ViewChild("anne_construct",{static:false})  anne_construct :ElementRef;
    //@ViewChild("idAdresse",{static:false})  idAdresse :ElementRef;

    public courriel :string = "test avec int type"
    public description :string ="lrfrol";
    public telephone :number = 1;
    public proprio_info :number = 1;
    public anne_construct :number = 1;
    public idAdresse :number = 1;

    public savedImage;

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

    /**
     * Soumission formulaire Requête POST
     */
    submitForm() {

        // this.makePostRequest();

    }


    /**
     * Ecoute les changements de valeurs des champs Imput
     * Exemple dans signale.component.html: <TextField #name (textChange)="onTextChange(name.text)"></TextField>
     * @param input
     */
    onTextChange(input) {
        //console.log(input);
        console.log(this.myPostService.formData.nom);
        //console.log(typeof this.telephone.nativeElement.text);
    }
    /**
     * Toggle pour montrer/cacher les différents types de signalement
     */
    showHide() {
        console.log('show');
    }
    /**
     * Change de section lors du remplissage du formulaire
     */
    nextStep() {
        console.log('lol')
    }

    makePostRequest() {

        this.myPostService
            .postData({ courriel: this.courriel,
                        description: this.description,
                        telephone: this.telephone,
                        proprio_info: this.proprio_info,
                        anne_construct: this.anne_construct,
                        idAdresse: this.idAdresse
                      })
            .toPromise().then( (data) => {
                console.log("Réponse du serveur : \n" + JSON.stringify(data));
            })
    }



    envoi() {
        request({
            url: "https://www.histologe.info/dev/_sign/getSign.php",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                username: "user",
                password: "password"
            })
        }).then(response => {
            var result = response.content.toJSON();
        }, error => {
            console.error(error);
        });
    }

    OpenCamera() {
        requestCameraPermissions();
        var milis = (new Date).getTime();
        var that = this;
        takePicture({width:300, height:300,keepAspectRatio:true}).then( (img) => {
            let source = new imageSourceModule.ImageSource();
            source.fromAsset(img).then ( (source) => {
                let folder = fs.knowFolders.documents();
                var path = fs.path.join(folder.path, "SaveImage"+milis+".png")
                var saved = source.saveToFile(path, "png");
                this.savedImage = path;
            })
        });
    }
}
