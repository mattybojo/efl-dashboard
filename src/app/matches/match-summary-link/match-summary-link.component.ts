import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'efl-match-summary-link',
  templateUrl: './match-summary-link.component.html',
  styleUrls: ['./match-summary-link.component.scss'],
})
export class MatchSummaryLinkComponent implements OnInit {

  @Input() value: string;
  @Input() rowData: any;

  url: string = '/matches/details';

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.router.url.includes('admin')) {
      this.url = '/admin/matches/details';
    }
  }
}
