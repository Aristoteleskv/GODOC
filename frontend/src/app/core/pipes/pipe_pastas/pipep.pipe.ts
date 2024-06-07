import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipep'
})
export class PipepPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
