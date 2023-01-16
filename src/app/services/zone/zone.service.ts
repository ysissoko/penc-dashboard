import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { switchMap } from "rxjs";
import { BaseService } from "../base/base.service";

@Injectable({
    providedIn: "root"
})
export class ZoneService extends BaseService {
    constructor(http_client_: HttpClient) {
        super(http_client_, "zone");
    }

    /**
     * Get the shops from a zone
     * @param id zone id
     * @returns return all shops from a zone
     */
    getZoneShops(id: number) {
        return this.find({ id }, ['shops', 'shops.user'])
            .pipe(switchMap(zones => zones.map((zone: any) => zone.shops)));
    }
}