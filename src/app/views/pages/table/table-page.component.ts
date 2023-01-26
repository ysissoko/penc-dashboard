import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, TableColumn } from '@swimlane/ngx-datatable';
import { finalize, Observable } from 'rxjs';
import { BaseService } from '../../../services/base/base.service';
import { JsonFormControl, JsonFormData } from '../../../shared/components/json-form/json-form.component';
import { BaseDto } from '../../../shared/dto/base.dto';
import { IBaseRow } from '../../../shared/interfaces/datatable/base-row.interface';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
  preserveWhitespaces: true
})
export class TablePageComponent implements OnInit {
  loadingIndicator = true;
  ColumnMode = ColumnMode;
  rows$: Observable<IBaseRow[]>;

  @Input() pageTitle: string = "";
  @Input() modalTitle: string = "";
  @Input() columns: TableColumn[] = [];
  @Input() jsonFormData: JsonFormData = {
    controls: [],
    currentId: null
  }
  @Input() datasource: BaseService;
  @Input() tranformDtoFn: (value: any) => any = (value: any) => value;

  constructor(private readonly _modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.refreshTable();
  }

  resetValues() {
    this.jsonFormData.controls.forEach((control: JsonFormControl) => control.value = "")
  }

  refreshTable() {
    this.rows$ = this.datasource.all().pipe(finalize(() => this.loadingIndicator = false));
  }

  openModalAddNew(content: any) {
    this.resetValues()
    this.jsonFormData.currentId = null;
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        console.log(`Dismissed ${reason}`)
      }
    );
  }

  add(value: BaseDto) {
    this.datasource.add(this.tranformDtoFn(value)).subscribe({
      next: () => {
        this.refreshTable();
      },
      error: console.error
    })
  }

  fillUpdateValues(row: IBaseRow) {
    for (let [k, v] of Object.entries(row)) {
      const control: JsonFormControl | undefined = this.jsonFormData.controls.find((control: JsonFormControl) => control.name === k)
      if (control)
        control.value = String(v);
    }
  }

  openModalUpdate(content: any, row: IBaseRow) {
    this.jsonFormData.currentId = row.id;

    this.fillUpdateValues(row);

    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        console.log(`Dismissed for reason ${reason}`);
      }
    );
  }

  update(row: IBaseRow) {
    const { id, ...updateObj } = row;
    this.datasource.update(id, this.tranformDtoFn(updateObj)).subscribe({
      next: (result) => {
        this._modalService.dismissAll('update success')
        this.refreshTable();
      },
      error: console.error
    })
  }

  remove(row: IBaseRow) {
    const { id } = row;

    this.datasource.delete(id).subscribe({
      next: () => {
        this.refreshTable();
      },
      error: console.error
    })
  }
}
