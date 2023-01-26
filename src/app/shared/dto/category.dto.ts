import { BaseDto } from "./base.dto";

export interface ICategoryDto extends BaseDto {
    name: string;
}

export class CategoryDTO {
    name: string = "";

    constructor(formValue: ICategoryDto) {
        this.name = formValue.name;
    }
}

