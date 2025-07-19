import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
   standalone: true,
})
export class SortByPipe implements PipeTransform {
  transform<T>(value: T[] | null, compareFn: (a: T, b: T) => number): T[] {
    if (!value) return [];
    const arrayCopy = [...value];

    return arrayCopy.sort(compareFn);
  }
}
