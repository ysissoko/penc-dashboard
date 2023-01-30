import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  constructor(private http: HttpClient) { }

  upload(file: string | Blob, url: string, filename: string, argName: string = "file"): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    (filename) ? formData.append(argName, file, filename) : formData.append(argName, file);

    return this.http.post(`${environment.BASE_URL}/${url}`, formData, {
      reportProgress: true,
      responseType: 'json',
      observe: 'events'
    });
  }
}
