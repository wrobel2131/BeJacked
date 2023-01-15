import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate',
})
export class SortByDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.sort(
      (
        a: { key: string | number | Date },
        b: { key: string | number | Date }
      ) => {
        let dateA: any = new Date(a.key);
        let dateB: any = new Date(b.key);
        return dateB - dateA;
      }
    );
  }
}
