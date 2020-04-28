import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ModelSignal } from "../modeles/SignalInterface" ;
import { ContactModel } from "../modeles/ContactModel";
import { Observable, BehaviorSubject, throwError } from 'rxjs';


@Injectable()
export class MyHttpPostService {

    signalement :ModelSignal = new ModelSignal();
    contact :ContactModel = new ContactModel();

    constructor(public http: HttpClient) {
        console.log("log de this.signalement du dataservice :" , this.signalement);
    }
    /**
     * Permet de soumettre les formulaires de l'application
     */
    postData(postData: any) {
        console.log("log de mes données que j'envoie au serveur \n" + JSON.stringify(postData));

        let options = this.createRequestOptions();
        return this.http.post("https://www.histologe.info/dev/_mob/getSign.php", { postData}, { headers: options });
    }

    private createRequestOptions() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return headers;
    }
    /**
     * Récupère la liste des situations
     */
    getDataList() {
        let options = this.createRequestHeaderGet();
        return this.http.get("https://www.histologe.info/dev/_mob/getList.php", { headers: options });
    }

    private createRequestHeaderGet() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            "AuthKey": "my-key",
            "AuthToken": "my-token",
            "Content-Type": "application/json",
         });

        return headers;
    }
    /**
     * Récupère la liste des critères en fonction de la situation sélectionnée
     * @param idSituation 
     */
    getCritere(idSituation :number)  {
        let headers = this.createRequestHeaderGet();
        return this.http.get(`https://www.histologe.info/dev/_mob/getCrit.php?idSituation=${idSituation}`, {headers : headers} );
    }
}
