import { Injectable } from "@angular/core";
import { isEmpty } from "rxjs/operators";

@Injectable()
export class ValidateurService {
    errors = [];

    isAlpha(field, errorMsg :string, nameField) {
        let testAlpha = /[a-zA-Zéèïùà -]+$/.test(field);
        if (field === undefined) {
            errorMsg = `Vous devez renseigner le champ : ${nameField} \n`;
            if (this.errors.indexOf(errorMsg) == -1) {
                this.errors.push(errorMsg);
            }
        }
        if (testAlpha == false) {
            this.errors.push(errorMsg);
        } else {
            let index = this.errors.indexOf(errorMsg);
            this.errors.splice(index,1);
        }
    }
    isEmail(field :string, errorMsg :string) {
        let testEmail = /^[a-z][a-z0-9.-]*@([a-z]{2,8}-?[a-z]{2,8}).[a-z]{2,6}$/.test(field);
        let emptyfield = "Vous devez renseigner un émail \n";

        if (field.length == 0 && this.errors.indexOf(emptyfield) == -1) {
            this.errors.push(emptyfield);
        } else {
            let indexTarget = this.errors.indexOf(emptyfield)
            this.errors.splice(indexTarget,1);
        }

        if (testEmail === false && field.length > 0) {
            let indexEmail = this.errors.indexOf(errorMsg);
            if (indexEmail == -1) {
                this.errors.push(errorMsg);
            }
        } else {
            let index = this.errors.indexOf(errorMsg);
            this.errors.splice(index,1);
        }
    }
    getErrors() {
        return this.errors;
    }

    isValid() :boolean {
        if (this.errors.length == 0 ) {
            return true;
        } else {
            return false;
        }
    }
    randomString(len :number) {
        const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
    }
}
