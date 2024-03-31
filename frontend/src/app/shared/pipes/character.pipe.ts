import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'character'
})
export class CharacterPipe implements PipeTransform {

  transform(value: string, maxLength: number): string {
    let result = value;
    if (result.length >= maxLength) {
      result = result.slice(0, maxLength)
      return result + '...'
    }
    return result
  }

}
