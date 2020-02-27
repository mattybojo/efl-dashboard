import { Component, Input } from '@angular/core';
import { faAdn, faCuttlefish } from '@fortawesome/free-brands-svg-icons';
import { faCrown, faFutbol, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'efl-cell-value-formatter',
  templateUrl: './cell-value-formatter.component.html',
  styleUrls: ['./cell-value-formatter.component.scss'],
})
export class CellValueFormatterComponent {

  @Input() value: string;
  @Input() rowData: any;

  type: string;
  team: string;

  faFutbol = faFutbol;
  faCrown = faCrown;
  faTimes = faTimes;
  faCuttlefish = faCuttlefish;
  faAdn = faAdn;

  constructor() {}
}
