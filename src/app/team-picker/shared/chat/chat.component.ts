import { ChatMessage } from './../../../shared/models/chat.model';
import { Component, OnInit, Input, ViewChild, NgZone, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { orderBy } from 'lodash';
import { DocumentReference } from '@angular/fire/firestore';
import { ChatService } from '../../../shared/services/chat.service';

@Component({
  selector: 'efl-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {

  @Input() team: string;
  @ViewChild('chatBox', {static: false}) chatBox: ElementRef;
  @ViewChildren('messages') messages: QueryList<any>;

  chat$: Observable<ChatMessage[]>;
  chatInput: string;
  isMessageSending: boolean = false;

  constructor(private chatService: ChatService, private ngZone: NgZone) {}

  ngOnInit() {
    this.chat$ = this.chatService.getMessages()
      .pipe(
        map(data => orderBy(data, ['timestamp'], ['asc'])),
        tap(() => this.scrollToBottom())
      );
  }

  onSubmit() {
    if (!this.isMessageSending) {
      this.isMessageSending = true;
      this.sendMessage(this.team, this.chatInput).subscribe(() => {
        this.chatInput = '';
        this.isMessageSending = false;
      });
    }
  }

  sendMessage(team: string, chatMsg: string): Observable<DocumentReference> {
    return this.chatService.saveMessage(team, chatMsg);
  }

  ngAfterViewInit() {
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
