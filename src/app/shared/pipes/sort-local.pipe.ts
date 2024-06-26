import { Pipe, PipeTransform } from '@angular/core';
import { SortOrder } from '../model/app-sort.interface';

@Pipe({
  name: 'sortLocal',
  pure: true,
})
export class SortLocalPipe implements PipeTransform {
  transform(
    value: any[],
    sortKey?: string,
    sortOrder: SortOrder | string = 'asc',
  ) {
    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);

    if (!value || (sortOrder !== 'asc' && sortOrder !== 'desc')) return value;

    let numberArray = [];
    let stringArray = [];
    if (!sortKey) {
      numberArray = value.filter((item) => typeof item === 'number').sort();
      stringArray = value.filter((item) => typeof item === 'string').sort();
    } else {
      numberArray = value
        .filter((item) => typeof item[sortKey] === 'number')
        .sort((a, b) => a[sortKey] - b[sortKey]);
      stringArray = value
        .filter((item) => typeof item[sortKey] === 'string')
        .sort((a, b) => {
          if (a[sortKey] < b[sortKey]) return -1;
          else if (a[sortKey] > b[sortKey]) return 1;
          else return 0;
        });
    }
    const sorted = numberArray.concat(stringArray);
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }
}
