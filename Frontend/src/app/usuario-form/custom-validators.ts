// src/app/custom-validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passwordsMatch(passwordField: string, repeatPasswordField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordField)?.value;
      const repeatPassword = control.get(repeatPasswordField)?.value;

      if (password !== repeatPassword) {
        return { passwordsMismatch: true };
      }
      return null;
    };
  }

  static mustBeEqual(nombrePrimerControl: string, nombreSegundoControl: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const primerControl = group.get(nombrePrimerControl);
      const segundoControl = group.get(nombreSegundoControl);
      return primerControl?.value === segundoControl?.value ? null : { mustBeEqual: true };
    };
  }
}
