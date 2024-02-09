import { ListProductImagesContract } from "./ListProductImagesContract";

export class ListProductContract {
    id:string;
    name:string;
    stok:number;
    price:number;
    updatedDate:Date;
    createdDate:Date;
    productImages?:ListProductImagesContract[];
    imagePath?:string;
    isShowcase?:boolean;
}
