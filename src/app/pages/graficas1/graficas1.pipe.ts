import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dataKeys'})
export class DataKeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    // tslint:disable-next-line:forin
    for (let key in value) {
      keys.push(value[key]);
    }

    return keys;
  }
}
