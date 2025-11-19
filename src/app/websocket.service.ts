import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserActivityModel } from './home/search-friends/user-activity.model';
import { SendMessageWSModel } from './home/right-sidebar/send-message.model';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient!: Client;
  public friendsOnline$ = new Subject<UserActivityModel>();

  connect(loggedUser: string | null): void {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8084/ws'),
      reconnectDelay: 5000,
      onConnect: () => {
        this.stompClient.publish({
          destination: '/app/chat.activeFriends',
          body: loggedUser ?? ''
        });
        this.stompClient.subscribe('/topic/public/friendsOnline', (message: IMessage) => {
          const friendStatus = JSON.parse(message.body);
          this.onFriendsOnlineUpdate(friendStatus);
        });
      },
      onStompError: (frame) => {
        console.error('Broker error:', frame.headers);
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

  getStompClient() {
    return this.stompClient;
  }

  sendMessageWs: SendMessageWSModel = {
    chatId: "",
    message: "",
    username: null,
    firstName: "",
    lastName: ""
  };

  sendMessage(message: string, username: string | null, chatId: string): void {
    this.sendMessageWs.message = message;
    this.sendMessageWs.username = username;
    this.sendMessageWs.chatId = chatId;
    this.stompClient.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(this.sendMessageWs)
    });
  }

  sendFriendInvitationNotification(): void {
    this.stompClient.publish({
      destination: '/app/chat.friendInvitation',
      body: ''
    });
  }
}
