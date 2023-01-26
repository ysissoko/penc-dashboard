import { BaseDto } from "./base.dto";

export interface ISubCategoryDto extends BaseDto {
    name: string;
    category: BaseDto;
}

export class SubCategoryDto {
    name: string = "";
    category: BaseDto;

    constructor(dto: ISubCategoryDto) {
        this.name = dto.name;
        this.category = dto.category;
    }
}

