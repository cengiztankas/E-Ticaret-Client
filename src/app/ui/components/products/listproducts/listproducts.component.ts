import { CreateBasketItemContract } from './../../../../contracts/Basket/create-basket-item-contract';
import { BasketService } from './../../../../services/common/models/basket.service';
import { FileService } from './../../../../services/common/models/file.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/common/models/product.service';
import { Component, OnInit } from '@angular/core';
import { ListProductContract } from 'src/app/contracts/Product/ListProductContract';
import { baseStorageUrlContract } from 'src/app/contracts/File/baseStorageUrlContract';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CostumToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/costum-toastr.service';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.scss']
})
export class ListproductsComponent extends BaseComponent implements OnInit{
  constructor( spinner:NgxSpinnerService,private basketService:BasketService , private productService:ProductService,
    private activatedRoute:ActivatedRoute,private fileService:FileService,private toastr:CostumToastrService){
    super(spinner)
  }
 

  products:ListProductContract[];
  baseStorageUrl:string;
  
  totalProductsCount:number;
  currentPageNo:number;
  totalPageCount:number;
  pageSize:number=5;
  pageList:number[];
  async ngOnInit() {
    this.baseStorageUrl=(await this.fileService.getBaseStorageUrl()).url;
    console.log(this.baseStorageUrl)
    this.activatedRoute.params.subscribe(async params=>{
      this.currentPageNo=parseInt(params["pageNo"]??1);
      const data=await this.productService.ReadProduct(this.currentPageNo-1,this.pageSize,()=>{},()=>{})
      this.products=data.products;
    
      this.products = data.products.map<ListProductContract>(p => {
        const listProduct: ListProductContract = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: p.productImages.find(k=>k.showcase)? p.productImages.find(c=>c.showcase).path : "",
          isShowcase:p.productImages.find(k=>k.showcase)?true:false,
          name: p.name,
          price: p.price,
          stok: p.stok,
          updatedDate: p.updatedDate,
          productImages: p.productImages,

        };
        
        return listProduct;
      });


      this.totalProductsCount=data.totalProductCount
      this.totalPageCount=Math.ceil(this.totalProductsCount/this.pageSize);



      this.pageList=[];
      if(this.totalPageCount<=7){
        for(let i=1;i<=this.totalPageCount; i++ ){
          this.pageList.push(i);
        }
      }
      else if(this.currentPageNo-3<=0){
        for(let i=1;i<=7; i++ ){
          this.pageList.push(i);
        }
      }else if(this.currentPageNo+3>=this.totalPageCount){
        for(let i=this.totalPageCount-6;i<=this.totalPageCount; i++ ){
          this.pageList.push(i);
        }
      }else{
        for(let i=this.currentPageNo-3;i<=this.currentPageNo+3; i++ ){
          this.pageList.push(i);
        }
      }
    });
   
  }


 async AddToCard(productId:string){
  this.showSpinner(spinnerType.Pacman)
    let basketItem=new CreateBasketItemContract();
    basketItem.productId=productId;
    basketItem.quantity=1;
   await this.basketService.add(basketItem,()=>{
    this.toastr.Message({
      message:"Başarılı",
      title:"Ürün Sepete Eklendi",
      messageType:ToastrMessageType.success,
      position:ToastrPosition.BottomRight
    })
   })
   this.HideSpinner(spinnerType.Pacman)
  }
}
