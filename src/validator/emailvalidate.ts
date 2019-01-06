import { FormControl } from '@angular/forms';

export class EmailValidator{
    static mailFormat(control: FormControl): ValidationResult {
          var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])+.[a-z0-9]([a-z0-9-]*[a-z0-9])? *$/i;
            if (control.value != "" &&  !EMAIL_REGEXP.test(control.value)) {
            return { "Please provide a valid email": true };
        }

            return null;
    }
}

export class WebsiteValidator{
    static urlFormat(control: FormControl): ValidationResult {
          var Website_Url = /^[https://http://www.]+[a-z0-9]([a-z0-9-]*[a-z0-9])+.[a-z0-9]([a-z0-9-]*[a-z0-9])? *$/i;
            if (control.value != "" &&  !Website_Url.test(control.value)) {
            return { "Please provide a valid Url": true };
        }

            return null;
    }
}

interface ValidationResult {
    [Key: string]: boolean;
}
