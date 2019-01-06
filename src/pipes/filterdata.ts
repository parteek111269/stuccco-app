import { Pipe } from '@angular/core';


@Pipe({
	name: 'spaceToUnderScore'
})
export class spaceToUnderScore {
	transform(value, args) {
		let argus = args.split("|");
		let str = value.replace(/\s+/g,argus[1]).toLowerCase();
		let Newvalue = str+'.'+argus[0];
		return Newvalue;
	}
}


