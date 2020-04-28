import { Component, OnInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { MyHttpPostService } from "../services/http-post.service";
import { HttpClient } from "@angular/common/http";

import { Switch } from "tns-core-modules/ui/switch";
import { EventData } from "tns-core-modules/data/observable";

// Caméra photo
import { takePicture, requestPermissions } from "nativescript-camera";
var fs = require("file-system");
import { ListPicker } from "tns-core-modules/ui/list-picker";
var BackgroundHttp = require("nativescript-background-http");
import { Image } from "tns-core-modules/ui/image";
import * as imagepicker from "nativescript-imagepicker"
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
import { ImageFormat } from "tns-core-modules/ui/enums";
import { ImageSource } from "tns-core-modules/image-source";
var MD5 = require("blueimp-md5");
import * as Toast from "nativescript-toast";
import { prompt, inputType } from "tns-core-modules/ui/dialogs";

const enums = require("ui/enums");

import { ChangeDetectorRef } from '@angular/core';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ViewContainerRef } from "@angular/core";
import { ModalViewComponent } from "./modal-view";
import { ViewChildren, QueryList } from '@angular/core';




@Component({
    selector: "Signale",
    templateUrl: "./signale.component.html",
    styleUrls: ["./signale.component.css"],
})
export class SignaleComponent implements OnInit {


    public saveToGallery: boolean = true;
    public cameraImage: ImageAsset;

    arrayCriteresChecked = [];
    isItemVisible = false
    checked: any
    host: string;
    userAgent: string;
    origin: string;
    url: string;

    proprietaire_informe : boolean
    modal :any
    listSituations :any
    listCriteres$ :any
    questSituation : string

    images :Array<any> = [];
    public nbAdulte: Array<any> = [0, 1, 2, 3, 4, "+ de 4"];
    public nbEnfant: Array<any> = [0, 1, 2, 3, 4, "+ de 4"];
    public surface: Array<any> = ["9 m²","16 m²" , "25 m²", "34 m²", "43 m²", "52 m²", "61 m²", "+ 70 m²"];

    public savedImage: any;

    constructor(public http : HttpClient, public myPostService: MyHttpPostService, zone : NgZone, private cdRef:ChangeDetectorRef) {
        // Use the component constructor to inject providers.

    }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("ngOnInit log du tableau criteres" + this.myPostService.signalement.criteres);
        this.getList();
    }

    testLog() {
        console.log("postService.sign.img : " + JSON.stringify(this.myPostService.signalement.img));
        console.log("length tabelau img" +  this.myPostService.signalement.img.length);
        console.log("log de this.images[] : " + JSON.stringify(this.images));
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    /**
     * Ecoute les changements de valeurs des champs Imput
     * Exemple dans signale.component.html: <TextField #name (textChange)="onTextChange(name.text)"></TextField>
     * @param input
     */
    onTextChange(input: any) {
        //console.log(input);
        //console.log(typeof this.telephone.nativeElement.text);
    }

    /**
     * Change de section lors du remplissage du formulaire
     */
    nextStep() {
        // console.log(this.myPostService.signalement.descriptionProb)
    }

    /**
     * Soumission du formulaire
     */
    postSignalement() {
        // this.sign.push(this.myPostService.signalement);
        // console.log(this.sign);

        this.myPostService
            .postData(this.myPostService.signalement)
            .toPromise().then( (data) => {
                console.log("Réponse du serveur : \n" + JSON.stringify(data));
            })
    }
    /**
     *  Déclenche Autorisation Caméra / déclenche la méthode de prise de photo
     * @param args
     */
    onTakePictureTap(args) {
        requestPermissions().then(
            () => this.capture(),
            () => alert("Vous devez autoriser l'accès à la caméra de votre smartphone pour permettre la prise de photos de vos signalements")
        );
    }

    /**
     * Permet de prendre une photo et de la stocker dans la variable de signalement dans http-post.service.ts
     */
    capture() {
        if ( this.myPostService.signalement.img.length >= 6) {
            alert({
                title: "Attention",
                message: "Vous ne pouvez pas télécharger plus de 6 photos",
                defaultText: "",
                okButtonText: "J'ai compris"
            })
            return;
        } else {
        takePicture({
            width: 150,
            height: 200,
            keepAspectRatio: true,
            saveToGallery: this.saveToGallery
            })
            .then((imageAsset: any) => {
                // var savepath = fs.knownFolders.currentApp().path  // tried this with and without the “/saved_images”
                // var filename = 'img_' + new Date().getTime() + '.jpg';
                // var filepath = fs.path.join(savepath, filename);
                // console.log('file://' + filepath); // this works

                this.cameraImage = imageAsset;
                imageAsset.getImageAsync(function (nativeImage: { size: { width: number; height: number; }; }) {
                    let scale = 1;
                    let height = 0;
                    let width = 0;
                    if (imageAsset.android) {
                        // get the current density of the screen (dpi) and divide it by the default one to get the scale
                        // scale = nativeImage.getDensity() / imageAsset.android.util.DisplayMetrics.DENSITY_DEFAULT;
                        height = 400;
                        width = 200;
                    } else {
                        // scale = nativeImage.scale;
                        width = 400;
                        height = 200;
                    }
                    console.log(`Displayed Size: ${width}x${height} with scale`);
                    console.log(`Image Size: ${width}x${height}`);
                    console.log("log de imageAsset" + JSON.stringify(imageAsset));
                });
                this.myPostService.signalement.img.push(imageAsset);

            }, (error) => {
                console.log("Error: " + error);
            });
        }
    }
    /**
     * Méthode de selection de fichiers(photos) existants à envoyer lors du signalement
     */
    selectPicture() {
        console.log(" log de length de myPOstservice.img " + this.myPostService.signalement.img.length);

        if ( this.myPostService.signalement.img.length >= 6) {
            alert({
                title: "Attention",
                message: "Vous ne pouvez pas télécharger plus de 6 photos",
                defaultText: "",
                okButtonText: "J'ai compris"
            })
            return;
        } else {
            let context = imagepicker.create({
                mode: 'multiple'
            });

            context.authorize()
            .then(function() {
                return context.present();
            })
            .then(selection => {
                selection.forEach(selected => {

                    console.log(JSON.stringify(selected));

                    let img = new Image();
                    img.src = selected;
                    this.myPostService.signalement.img.push(img.src);
                });
            }).catch(function (e) {
                console.log('error in selectPicture', e);
            });
        }

    }
    /**
     * plugin Nativescript background Http - Chargement et POST des images vers le serveur
     *
     */
    upload() {
        let arrayImg = this.myPostService.signalement.img;
        if(arrayImg.length === 0) return;

        let session = BackgroundHttp.session("image-upload");

        let request = {
            url: 'https://www.histologe.info/dev/_mob/upload.php',
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        var params = [];
        if (arrayImg.length > 1) {
            let counter = 0;
            arrayImg.forEach(i => {
                params.push(
                    {
                        name:'image' + (++counter),
                        filename: i.android,
                        mimeType:'image/jpeg'
                    }
                );
            });
            let task = session.multipartUpload(params, request);
            this.handleProgress(task)
        } else {
            // A voir quelles données doivent être envoyées pour l'envoi d'une seule photo
            // ERROOR de response server
            let task = session.uploadFile(arrayImg[0]._android, request);
            this.handleProgress(task)
        }
    };
    /**
     * Méthode de suivi de l'évolution des Uploads vers serveur
     */
    private handleProgress(task) {
        console.log(" 1er task : " + JSON.stringify(task));

        task.on('error', e => {
            console.log('error', JSON.stringify(e));
        });

        task.on('complete', e => {
        console.log('complete', JSON.stringify(e));

        // Même chose que task.on('responded')
        let server = JSON.stringify(e.response.getBodyAsString());
        console.log("log de server" , JSON.parse(server));
        });

        // task.on('responded', (e) => {
        //     console.log("log de responded" ,JSON.stringify(e));
        // })
    }

    // start_upload() {
    //     const name = this.file.substr(this.file.lastIndexOf("/") + 1);
    //     const description = `${name} (${++this.counter})`;
    //     const request = {
    //         url: this.url,
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/octet-stream",
    //             "File-Name": name
    //         },
    //         description: description,
    //         androidAutoDeleteAfterUpload: false,
    //         androidNotificationTitle: 'NativeScript HTTP background',
    //     };

    //     if (should_fail) {
    //         request.headers["Should-Fail"] = true;
    //     }

    //     let task: BackgroundHttp.Task;
    //     let lastEvent = "";
    //     if (isMulti) {
    //         const params = [
    //             { name: "test", value: "value" },
    //             { name: "testInt", value: 10 },
    //             { name: "bool", value: true },
    //             { name: "fileToUpload", filename: this.file, mimeType: 'image/jpeg' }
    //         ];
    //         task = this.session.multipartUpload(params, request);
    //     } else {
    //         task = this.session.uploadFile(this.file, request);
    //     }
    // }
    // public upload(destination: string, filevar: string, filepath: string) {
    //     return new Observable((observer: any) => {
    //         let session = BackgroundHttp.session("file-upload");
    //         let request = {
    //             url: destination,
    //             method: "POST"
    //         };
    //         let params = [{ "name": filevar, "filename": filepath, "mimeType": "image/png" }];
    //         let task = session.multipartUpload(params, request);
    //         task.on("complete", (event) => {
    //             let file = FileSystem.File.fromPath(filepath);
    //             file.remove().then(result => {
    //                 observer.next("Uploaded `" + filepath + "`");
    //                 observer.complete();
    //             }, error => {
    //                 observer.error("Could not delete `" + filepath + "`");
    //             });
    //         });
    //         task.on("error", event => {
    //             console.log(event);
    //             observer.error("Could not upload `" + filepath + "`. " + event.eventName);
    //         });
    //     });
    // }
    getList() {
        this.myPostService.getDataList()
            .subscribe( (data) => {
                console.log(data);
                this.listSituations = data;
                this.onGetDataSuccess(data);
            }, (error) => {
                console.log(error);
            });
    }

    private onGetDataSuccess(res) {
        this.host = res.headers.Host;
        this.userAgent = res.headers["User-Agent"];
        this.origin = res.origin;
        this.url = res.url;
    }

    getCritere(id :number, quest: string) {

        this.myPostService.getCritere(id)
            .subscribe( (data) => {
                // console.log(data);
                this.listCriteres$ = data;
                this.questSituation = quest
            })

    }
    getDescript() {

    }
    verif(idCrit: any, arr: any[]) {
        return arr.some( (el: { idCrit: any; }) => {
            return el.idCrit === idCrit;
        })
    }

    onCheckedChange(args :EventData, item)  {
        let sw = args.object as Switch;
        // console.log(sw);
        let isChecked = sw.checked;
        let criteres = this.myPostService.signalement.criteres;

        let crit = {
            "_id" : item.idCritere,
            "nom" : item.libCritere
        }
        // console.log("log de crit" + JSON.stringify(crit));
        console.log("log de l'index du criteres.indexOf(item.idCriteres) : " + criteres.indexOf(item.idCritere));
        console.log("log de criteres" + JSON.stringify(criteres));

        // Vérif si dans le tableau criteres de myPostService.signalement s'il y a un objet qui a déjà l'id du critère signalé
        // const checkIdCriteres = (obj: { _id: number; })  => obj._id === crit._id;
        // if ( isChecked && criteres.some(checkIdCriteres) == false ) {

            if (isChecked && criteres.indexOf(item.idCritere) == -1 ) {
                // if ( isChecked && !this.verif(crit._id, criteres) ) {
                    // console.log("Id du critère sélectionné : " + item.idCritere +"\nValeur :" + isChecked);
                    criteres.push(item.idCritere);
                    this.arrayCriteresChecked.push(item.libCritere)
                } else {
                    let indexCritere = criteres.indexOf(item.idCritere);
                    let indexLibCritere = this.arrayCriteresChecked.indexOf(item.libCritere);
                    console.log("log de indexcritere : " + indexCritere);
                    criteres.splice(indexCritere,1)
                    this.arrayCriteresChecked.splice(indexLibCritere,1)

                // indexCritere renvoie l'index (la position) du critere dans le tableau de la propriété criteres
            }
    }
    /**
     * Permet d'afficher le switch sur true ou false en fonction des critères choisis
     * Problème à résoudre d'état des données lorsque que des critères sont sélectionnés et qu'on revient dessus error
     * @param idCrit
     * return @boolean
     */
    verifChecked(idCrit: number) {
        let criteres = this.myPostService.signalement.criteres;

        if (criteres.indexOf(idCrit) !== -1  ) {
            return true;
        } else {
            return false;
        }
    }

    public onSelectedIndexChanged(args: EventData, prop : any[]) {
        const picker = <ListPicker>args.object;
        console.log(`index: ${picker.selectedIndex}; item" ${prop[picker.selectedIndex]}`);

        return prop[picker.selectedIndex];
    }

    // public showModal(checklist) {
    //     let options = {
    //       context: {
    //         username: "lol",
    //         cpf: "lol",
    //         batida: "lol",
    //         documents: "bonjour"
    //       },
    //       fullscreen: true,
    //       viewContainerRef: this.vcRef
    //     };
    //     this.modal.showModal(ModalViewComponent, options);
    //   }


    // getStartDate() {
    //     this.createModelView().then(result => {
    //         if (this.validate(result)) {
    //             this.startDate = result;
    //         }
    //     }).catch(error => this.handleError(error));
    // }

    // getEndDate() {
    //     this.createModelView().then(result => {
    //         if (this.validate(result)) {
    //             this.endDate = result;
    //         }
    //     }).catch(error => this.handleError(error));
    // }

    // // >> returning-result
    // getDate() {
    //     this.createModelView().then(result => {
    //         if (this.validate(result)) {
    //             this.selectedDate = result;
    //         }
    //     }).catch(error => this.handleError(error));
    // }

    // private createModelView(): Promise<any> {
    //     const today = new Date();
    //     const options: ModalDialogOptions = {
    //         viewContainerRef: this.vcRef,
    //         context: today.toDateString(),
    //         fullscreen: false,
    //     };

    //     // showModal returns a promise with the received parameters from the modal page
    //     return this.modalService.showModal(ModalViewComponent, options);
    // }
    // // << returning-result

    // countDays() {
    //     if (this.startDate.getTime() > this.endDate.getTime()) {
    //         alert("Enter correct end date");
    //     } else {
    //         this.days = dayDiff(this.startDate, this.endDate);
    //     }
    // }

    // private resetDates() {
    //     this.startDate = new Date("2015-12-12");
    //     this.endDate = new Date();
    //     this.selectedDate = new Date();
    //     this.days = dayDiff(this.startDate, this.endDate);
    // }

    // private validate(result: any) {
    //     return !!result;
    // }

    // private handleError(error: any) {
    //     this.resetDates();
    //     alert("Please try again!");
    //     console.dir(error);
    // }
}

