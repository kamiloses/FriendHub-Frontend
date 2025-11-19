import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserActivityModel } from './home/search-friends/user-activity.model';
import { SendMessageWSModel } from './home/right-sidebar/send-message.model';
import { Client, IMessage, StompSubscription, StompConfig, StompHeaders } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient!: Client;
  public friendsOnline$ = new Subject<UserActivityModel>();

  connect(loggedUser: string | null): void {
    this.stompClient = new Client({
      brokerURL: undefined, // jeśli używamy SockJS, brokerURL = undefined
      webSocketFactory: () => new SockJS('http://localhost:8084/ws'),
      reconnectDelay: 5000,
      debug: (str) => console.log('[STOMP DEBUG]', str),
      onConnect: (frame) => {
        console.log('WebSocket connected', frame);
        if (loggedUser) {
          this.stompClient.publish({
            destination: '/app/chat.activeFriends',
            body: loggedUser
          });
        }

        this.stompClient.subscribe('/topic/public/friendsOnline', (message: IMessage) => {
          try {
            const friendStatus: UserActivityModel = JSON.parse(message.body);
            this.onFriendsOnlineUpdate(friendStatus);
          } catch (err) {
            console.error('Error parsing friendsOnline message:', err);
          }
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

  private onFriendsOnlineUpdate(userActivityDto: UserActivityModel): void {
    this.friendsOnline$.next(userActivityDto);
  }

  getStompClient(): Client {
    return this.stompClient;
  }

  sendMessageWs: SendMessageWSModel = {
    chatId: '',
    message: '',
    username: null,
    firstName: '',
    lastName: ''
  };

  sendMessage(message: string, username: string | null, chatId: string): void {
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

  sendFriendInvitationNotification(): void {
    if (!this.stompClient || !this.stompClient.connected) return;

    this.stompClient.publish({
      destination: '/app/chat.friendInvitation',
      body: ''
    });
  }
}
