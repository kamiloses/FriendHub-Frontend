import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserActivityModel } from './home/search-friends/user-activity.model';
import { SendMessageWSModel } from './home/right-sidebar/send-message.model';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient!: Client;
  public friendsOnline$ = new Subject<UserActivityModel>();

  connect(loggedUser: string | null): void {
    if (!loggedUser) {
      console.error('Cannot connect WebSocket: loggedUser is null!');
      return;
    }

    this.stompClient = new Client({
      brokerURL: undefined,
      webSocketFactory: () => new SockJS('http://localhost:8084/ws'),
      reconnectDelay: 5000,
      debug: (msg) => console.log('[STOMP DEBUG]', msg),
      connectHeaders: { username: loggedUser },
      onConnect: (frame) => {
        console.log('WebSocket connected as:', loggedUser);

        this.stompClient.subscribe('/topic/public/friendsOnline', (msg: IMessage) => {
          const payload: UserActivityModel = JSON.parse(msg.body);
          console.log('Online update received:', payload);
          this.friendsOnline$.next(payload);
        });

        this.stompClient.publish({
          destination: '/app/chat.activeFriends',
          body: loggedUser
        });
      },
      onStompError: (frame) => {
        console.error('STOMP Broker error:', frame.headers['message'], frame.body);
      },
      onWebSocketError: (event) => {
        console.error('WebSocket error:', event);
      }
    });

    this.stompClient.activate();
  }

  sendMessageWs: SendMessageWSModel = {
    chatId: '',
    message: '',
    username: null,
    firstName: '',
    lastName: ''
  };

  sendMessage(message: string, username: string, chatId: string): void {
    if (!this.stompClient || !this.stompClient.connected) {
      console.warn('STOMP client not connected yet.');
      return;
    }

    this.sendMessageWs.message = message;
    this.sendMessageWs.username = username;
    this.sendMessageWs.chatId = chatId;

    this.stompClient.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(this.sendMessageWs)
    });
  }

  getStompClient(): Client {
    return this.stompClient;
  }

  sendFriendInvitationNotification(): void {
    if (!this.stompClient || !this.stompClient.connected) return;

    this.stompClient.publish({
      destination: '/app/chat.friendInvitation',
      body: ''
    });
  }
}
