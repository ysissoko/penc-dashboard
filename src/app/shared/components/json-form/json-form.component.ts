import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

interface JsonFormValidator {
    name: string
    value?: any
}

export interface JsonFormControl {
    name: string
    label?: string
    value: string
    type: string
    placeholder?: string
    validators: JsonFormValidator[]
    options?: [{ value: string, name: string }]
    uploadUrl?: string
}

export interface JsonFormData {
    controls: JsonFormControl[];
    currentId: number | null;
}

@Component({
    selector: 'app-json-form',
    templateUrl: './json-form.component.html',
    styleUrls: ['./json-form.component.scss'],
})
export class JsonFormComponent implements OnChanges {
    @Input() jsonFormData: JsonFormData;
    @Output() create = new EventEmitter<any>();
    @Output() update = new EventEmitter<any>();
    @Output() upload = new EventEmitter<any>();

    form: FormGroup = new FormGroup({});
    private previews: any = {};

    ngOnChanges(changes: SimpleChanges) {
        this.initFormGroup();
    }

    initFormGroup(): void {
        this.jsonFormData.controls.forEach((control: JsonFormControl) => {
            this.form.addControl(control.name, new FormControl(control.value, control.validators.map((validator: JsonFormValidator) => this.createValidator(validator))))
        });
    }

    createValidator(validator: JsonFormValidator): any {
        const { value } = validator;
        switch (validator.name) {
            case 'min': return Validators.min(Number(value))
            case 'max': return Validators.max(Number(value))
            case 'required': return Validators.required
            case 'requiredTrue': return Validators.requiredTrue
            case 'email': return Validators.email(value)
            case 'minLength': return Validators.minLength(Number(value))
            case 'maxLength': return Validators.maxLength(Number(value))
            case 'pattern': return Validators.pattern(String(value))
            case 'nullValidators': return Validators.nullValidator
            default:
                console.error("unkonwn validator")
                break;
        }
    }

    onUpload(filename: string, control_name: string) {
        this.form.get(control_name)?.setValue(filename);
        this.previews[control_name] = `${environment.BASE_URL}/uploads/${filename}`;
    }

    getImgPreview(control_name: string) { return this.previews[control_name]; }

    onSubmit() {
        const { currentId } = this.jsonFormData;
        if (this.form.valid)
            (currentId) ? this.update.emit({ id: currentId, ...this.form.value }) : this.create.emit(this.form.value)
    }
}