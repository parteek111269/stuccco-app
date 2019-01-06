import { FormControl } from '@angular/forms';
declare var Stripe;
export class appVaildator {

  /**
  *@description  Check expire date on the credit card sysrem
  *@param: 
  *@return
  */
  static expirydatecheck(control: FormControl): ValidationResult {
      let dataStore = (control.value).split('-');
      let sM = parseInt(dataStore[1]);
      let sY = parseInt(dataStore[0]);
      
      var dateS = new Date();
      let y  = (dateS.getFullYear())
      let m = (dateS.getMonth())
      
      if(sM<m && sY<=y){
          return { "Please provide a valid date": true };
      }
      return null;
  }

  /**
    * @description: Validate a credit card By stripe algorithum
    * @param: 
    * @return: 
    */

  static checkcardnumber(control: FormControl): ValidationResult {
      let cardNumber = (control.value);
      Stripe.card.validateCardNumber(cardNumber);
        if(Stripe.card.validateCardNumber(cardNumber) ==false)
        {  
          return { "Please enter the valid card number": true };
        }
      return null;
  }

  static checkcvc(control: FormControl): ValidationResult {
      let cvc = (control.value);
       Stripe.card.validateCVC(cvc);
       if(Stripe.card.validateCVC(cvc) ==false)
        {  
          return { "Please enter the valid cvc" : true };
           
        }
      return null;
  }
  /**
  *@description  Check if input leangh is zero or not
  *@param: 
  *@return
  */
  static isZero(control: FormControl): ValidationResult {
      let n = parseFloat(control.value);
      if(n<=0){
        return {"Not a valid type": true };
      }
      return null;
  }


  /**
  *@description  Check credit card system
  *@param: 
  *@return
  */
  static isCardValid(control: FormControl): ValidationResult {
    
    return null;
  }

}

/**
  *@description  Define your interface
  *@param: 
  *@return
  */
interface ValidationResult {
    [Key: string]: boolean;
}