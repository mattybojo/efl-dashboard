import { Pipe, PipeTransform } from '@angular/core';
import { SignUpRecord } from '../shared/models/sign-up.model';

@Pipe({
  name: 'isNotPlaying'
})
export class IsNotPlayingPipe implements PipeTransform {

  transform(value: SignUpRecord[], ...args: any[]): any {
    return value.filter(x => !x.isPlaying);
  }

}
