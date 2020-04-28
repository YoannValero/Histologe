import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DatePicker } from "tns-core-modules/ui/date-picker";

@Component({
    moduleId: module.id,
    templateUrl: "./modal-view.html",
})
export class ModalViewComponent implements OnInit {
    public dataModal: any
    @ViewChild("datepicker", { read: ElementRef, static: true }) datePickerElement: ElementRef;

    constructor(private params: ModalDialogParams) {

    }
    ngOnInit() {
        this.dataModal = this.params.context
    }

    public close(res: string) {
        this.params.closeCallback();
    }
}
