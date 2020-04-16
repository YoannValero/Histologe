import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";


@Injectable()
export class MyHttpPostService {
    private serverUrl = "https://www.histologe.info/dev/_sign/getSign.php";

    formData : any;

    constructor(public http: HttpClient) {
        this.formData = {
            prenom : "",
            nom:""
        }
     }

    postData(postData: any) {
        console.log("log de mes données que j'envoie au serveur \n" + JSON.stringify(postData));

        let options = this.createRequestOptions();
        return this.http.post(this.serverUrl, { postData }, { headers: options });
    }

    private createRequestOptions() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return headers;
    }
}
