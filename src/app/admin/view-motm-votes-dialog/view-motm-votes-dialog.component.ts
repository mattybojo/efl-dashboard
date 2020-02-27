import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'efl-view-motm-votes-dialog',
  templateUrl: './view-motm-votes-dialog.component.html',
  styleUrls: ['./view-motm-votes-dialog.component.scss'],
})
export class ViewMotmVotesDialogComponent implements OnInit {

  data: any;
  sortedVoteData: any;

  constructor(private dialogRef: NbDialogRef<ViewMotmVotesDialogComponent>) { }

  ngOnInit() {
    this.sortedVoteData = _(this.data)
      .groupBy(data => data.vote)
      .map((data, vote) => ({ vote: vote, count: data.length, voters: _.map(data, 'user').join(', ') }))
      .orderBy(group => group.count, ['desc'])
      .value();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
