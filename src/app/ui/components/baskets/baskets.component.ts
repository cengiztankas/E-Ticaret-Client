import { BasketItemRemoveState } from './../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { DialogService } from './../../../services/common/dialog.service';
import { BasketService } from './../../../services/common/models/basket.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { ListBasketItemContract } from 'src/app/contracts/Basket/list-basket-item-contract';
import { UpdateBasketItemContract } from 'src/app/contracts/Basket/update-basket-item-contract';
import { CreateOrderContract } from 'src/app/contracts/Order/CreateOrderContract';
import { BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CostumToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/costum-toastr.service';
declare var $:any 
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})

export class BasketsComponent extends BaseComponent implements OnInit {
  /**
   *
   */
  
  basketItems:ListBasketItemContract[];
  constructor(spinner:NgxSpinnerService,private basketService:BasketService,private orderService:OrderService,
    private toastr:CostumToastrService,private router:Router,private dialogService:DialogService
    ) {
    super(spinner);
    
  }
 async ngOnInit() {
    this.showSpinner(spinnerType.SquareJellyBox)
     this.basketItems= await this.basketService.get()
     this.HideSpinner(spinnerType.SquareJellyBox)
  }
 async changeQuaintity(object:any){

    this.showSpinner(spinnerType.SquareJellyBox)   
    debugger
    const basketItemId:string=object.target["id"]
    const quantity:number=object.target.value;
    const basketItem:UpdateBasketItemContract=new UpdateBasketItemContract();
    basketItem.basketItemId=basketItemId
    basketItem.quantity=quantity;
   
    await this.basketService.updateQuantity(basketItem);

    this.HideSpinner(spinnerType.SquareJellyBox)   

  }
  
   RemoveBasketItem(basketItemId:string,i:number){
    $("#BasketModal").modal("hide");
    this.dialogService.openDialog({
      ComponentType:BasketItemRemoveDialogComponent,
      data:BasketItemRemoveState.yes,
      afterClosed: async ()=>{
        this.showSpinner(spinnerType.SquareJellyBox)

        await this.basketService.remove(basketItemId,()=> {})
        const a:string="basketItem_"+i;
        debugger
        $("."+a).fadeOut(100,()=>this.HideSpinner(spinnerType.SquareJellyBox))
      }
    });
  
  }

  ShoppingComplete(){
    $("#BasketModal").modal("hide");
    this.dialogService.openDialog({
      ComponentType:ShoppingCompleteDialogComponent,
      data:ShoppingCompleteState.yes,
      afterClosed:async ()=>{
          this.showSpinner(spinnerType.SquareJellyBox);
          const order:CreateOrderContract=new CreateOrderContract();
          order.address="istanbul";
          order.description="As of Bootstrap 5.2.0, all components support an experimental reserved data attribute data-bs-config that can house simple component configuration as a JSON string. When an element has data-bs-config'56 and the separate data attributes will override values given on data-bs-config. In addition, existing data attributes are able to house";
         await this.orderService.Create(order)
          this.HideSpinner(spinnerType.SquareJellyBox);
          this.toastr.Message({
            message:"Sepet Tamamlandı",
            title:"Sepetiniz Başarıyla Onaylandı",
            position:ToastrPosition.BottomRight,
            messageType:ToastrMessageType.success
          })
          this.router.navigate(["/"])
      }
    })
   
    
  }

}
