import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import Compressor from 'compressorjs';
import { ToastrService } from 'ngx-toastr';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent {

  @Input() upload_url!: string;
  @Input() previewUrl: string | null = null;
  @Input() argName: string = "file";
  @Output("uploadEvent") uploadEvent: EventEmitter<any> = new EventEmitter();

  selectedFiles!: FileList;
  currentFile!: any;
  inProgress: boolean = false;
  progress = 0;
  fileInfos: Array<string> = [];

  constructor(private uploadService: UploadFileService, private toastrService: ToastrService) { }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.selectedFiles && this.upload()
  }

  upload(): void {
    this.progress = 0;
    this.inProgress = true
    this.currentFile = this.selectedFiles.item(0);
    new Compressor(this.currentFile, {
      quality: 0.6,
      width: 800,
      success: (result: Blob | File) => {
        let nameArr = this.currentFile?.name.split(".");
        let fileName = Math.random().toString(36).substr(2, 9) + "." + nameArr[nameArr.length - 1];
        this.uploadRequest(result, fileName);
      },
      error: console.error,
    });
  }

  uploadRequest(result: Blob | File, fileName: string) {
    this.uploadService.upload(result, this.upload_url, fileName, this.argName).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);

          if (this.progress >= 100) {
            console.log("file uploaded")
            this.toastrService.success('La photo a bien été mise à jour');
            this.uploadEvent.emit(fileName);
            this.fileInfos.push(fileName);
          }
          console.log(this.progress)
        } else if (event.type === HttpEventType.Response) {
          // File is uploaded
          // console.log("file uploaded")
          // this.toastrService.success('La photo a bien été mise à jour');
          // this.uploadEvent.emit(fileName);
          // this.fileInfos.push(fileName);
        }
      },
      error: () => {
        // Upload error
        this.toastrService.error('Erreur lors de la mise à jour de la photo');
        this.progress = 0;
        this.currentFile = undefined;
      }
    });
  }
}
