
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadFileService } from '../upload-files/upload-file.service';
import { UploadFilesComponent } from '../upload-files/upload-files.component';
import { JsonFormComponent } from './json-form.component';

@NgModule({
    declarations: [JsonFormComponent, UploadFilesComponent],
    exports: [JsonFormComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [UploadFileService]
})
export class JsonFormModule { }
