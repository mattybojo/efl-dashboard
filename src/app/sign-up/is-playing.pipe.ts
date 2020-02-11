import { SignUpRecord } from './../shared/models/sign-up.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isPlaying',
})
export class IsPlayingPipe implements PipeTransform {

  transform(value: SignUpRecord[], ...args: any[]): any {
    return value.filter(x => x.isPlaying);
  }

}
