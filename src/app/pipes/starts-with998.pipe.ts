import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startsWith998'
})
export class StartsWith998Pipe implements PipeTransform {

  transform(phoneNumber: string): boolean {
    return phoneNumber.startsWith('+998');
  }

}
