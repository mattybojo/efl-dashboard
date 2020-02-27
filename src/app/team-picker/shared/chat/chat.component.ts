import { orderBy } from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild,
  ViewChildren,
} from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';

import { ChatMessage } from '../../../shared/models/chat.model';
import { ChatService } from '../../../shared/services/chat.service';

@Component({
  selector: 'efl-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() team: string;
  @ViewChild('chatBox', {static: false}) chatBox: ElementRef;
  @ViewChildren('messages') messages: QueryList<any>;

  chat$: Observable<ChatMessage[]>;
  chatInput: string;
  isMessageSending: boolean = false;

  subscription$: Subscription[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chat$ = this.chatService.getMessages()
      .pipe(
        map(data => orderBy(data, ['timestamp'], ['asc'])),
        tap(() => this.scrollToBottom()),
      );
  }

  onSubmit() {
    if (!this.isMessageSending) {
      this.isMessageSending = true;
      this.subscription$.push(
        this.sendMessage(this.team, this.chatInput).subscribe(() => {
          this.chatInput = '';
          this.isMessageSending = false;
        }),
      );
    }
  }

  sendMessage(team: string, chatMsg: string): Observable<DocumentReference> {
    return this.chatService.saveMessage(team, chatMsg);
  }

  ngAfterViewInit() {
    this.subscription$.push(this.messages.changes.subscribe(this.scrollToBottom));
  }

  scrollToBottom = () => {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (err) {}
  };

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }
}
