import { Pipe } from '@angular/core';


@Pipe({
	name: 'addSpaceAfterComma'
})
export class addSpaceAfterComma {
	transform(value,args) {
                if(args== undefined){
                    return false
                }else{
                   var newStr=args.split(",").join(", ");
                   return newStr;
                }
	}
}


