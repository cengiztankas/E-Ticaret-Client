import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function MatchPasword():ValidatorFn {
    return(control:AbstractControl):ValidationErrors|null=>{
        const password=control.get("password").value;
        const paswordConfirm=control.get("passwordConfirm").value;
        if(password!=paswordConfirm){
            return {"noMatch":true}
        }
        return null;
    };

}
