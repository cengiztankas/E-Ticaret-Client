import { ListBasketItemContract } from "../Basket/list-basket-item-contract";

export class SingleOrderContract{
address:string;
basketItems:ListBasketItemContract[];
createdDate:Date;
description:string;
id:string;
orderCode:string;
isCompleted:boolean;
}

