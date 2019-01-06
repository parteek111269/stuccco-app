import { Pipe } from '@angular/core';

@Pipe({
	name: 'text'
})
export class plainText {
	transform(value) {
		return  value ? String(value).replace(/<[^>]+>/gm, '') : '';
	}
}