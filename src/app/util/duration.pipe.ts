import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name : 'jsoundDuration'
})

export class DurationPipe implements PipeTransform {
  public transform(value: number) {
    let sec = Math.floor((value / 1000) % 60);
    let min = Math.floor((value / (1000 * 60)) % 60);
    return min + ':' + ('0' + sec).slice(-2);
  }
}
