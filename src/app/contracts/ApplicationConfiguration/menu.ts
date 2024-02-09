export class menuContract{
name:string;
actions:ActionContract[];
}
export class ActionContract{
    actionType:string;
    httpType:string
    definition:string;
    code:string;
}
