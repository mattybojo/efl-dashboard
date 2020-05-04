import { Observable, Subscription } from 'rxjs';

import { Component, Input, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';

import { ChatMessage } from '../../../shared/models/chat.model';
import { ChatService } from '../../../shared/services/chat.service';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

@Component({
  selector: 'efl-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {

  @Input() team: string;
  @Input() playerName: string;

  chat$: Observable<ChatMessage[]>;
  messages: any[] = [];

  dummy;

  constructor(private chatService: ChatService) {}
  ngAfterViewInit(): void {
    this.chat$ = this.dummy;
  }

  ngOnInit() {
    this.dummy = this.chatService.getMessages().pipe(
      map((messages: ChatMessage[]) => {
        messages.forEach((msg: ChatMessage) => msg.date = msg.timestamp.toDate());
        return messages;
      }),
    );
  }

  sendMessage(event: any) {
    const message: ChatMessage = {
      text: event.message,
      user: {
        name: this.playerName,
        team: this.team,
      },
    };

    this.chatService.saveMessage(message);
  }
}
