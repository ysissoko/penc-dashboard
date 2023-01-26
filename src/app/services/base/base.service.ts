// import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class BaseService {
  public http: HttpClient;
  public endpoint: string;

  constructor(_http: HttpClient, _endpoint: string) {
    this.http = _http;
    this.endpoint = _endpoint;
  }

  add(model: any): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/${this.endpoint}`, model);
  }

  find(model: any, relations: string[] = [], extra: any = {}): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/${this.endpoint}/find`, { where: model, relations: relations, ...extra });
  }

  findById(id: string): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/${this.endpoint}/${id}/get`, {});
  }

  all(): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/${this.endpoint}/all`, {});
  }

  update(id: any, data: any) {
    return this.http.put(`${environment.BASE_URL}/${this.endpoint}/${id}`, data);
  }

  delete(_id: string | number) {
    return this.http.delete(`${environment.BASE_URL}/${this.endpoint}/${_id}`, { params: { id: _id } });
  }
}
