import { DialogService } from 'src/app/services/common/dialog.service';
import { ApplicationService } from './../../../services/common/models/application.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AuthorizeMenuDialogComponent } from 'src/app/dialogs/authorize-menu-dialog/authorize-menu-dialog.component';


interface ITreeMenu {
  name?: string,
  actions?: ITreeMenu[],
  code?: string,
  menuName?: string
}


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss']
})

export class AuthorizeMenuComponent implements OnInit {
  constructor(private applicationService:ApplicationService,private dialogService:DialogService) {
    
  }
async  ngOnInit() {
  this.dataSource.data = await (await this.applicationService.GetAuthorizeDefinitionEndpoints()).map(m=>{
  
    const menu:ITreeMenu={
      
      name:m.name,
      actions:m.actions.map(a=>{
        const _menu:ITreeMenu={
          name:a.definition,
          code:a.code,
          menuName:m.name
          
        }
        return _menu
      })
    }
    return menu;
  })
      
  }

  private _transformer = (node: ITreeMenu, level: number) => {
    return {
      expandable: !!node.actions && node.actions?.length > 0,
      name: node.name,
      code:node.code,
      menuName:node.menuName,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.actions
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  assignRole(code:string,name:string,menuName:string){
    console.log("ad"+code+name+menuName);
    
    this.dialogService.openDialog({
      ComponentType:AuthorizeMenuDialogComponent,
      
      options:{width:"500px"},
      data:{code: code, name: name, menuName: menuName},
      afterClosed:()=>{
          
      }
    })
  }
}
