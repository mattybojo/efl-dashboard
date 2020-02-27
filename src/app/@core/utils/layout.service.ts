import { Observable, Subject } from 'rxjs';
import { delay, share } from 'rxjs/operators';

import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {

  protected layoutSize$ = new Subject();

  changeLayoutSize() {
    this.layoutSize$.next();
  }

  onChangeLayoutSize(): Observable<any> {
    return this.layoutSize$.pipe(
      share(),
      delay(1),
    );
  }
}
