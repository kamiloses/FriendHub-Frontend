import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../post-list/user.model';
import { HttpClient } from '@angular/common/http';
import { GlobalEnvironmentVariables } from '../../auth/global-environment-variables';
import { Router, NavigationEnd } from '@angular/router';
import { WebSocketService } from '../../websocket.service';
import { UserActivityModel } from '../search-friends/user-activity.model';
import { SendMessageWSModel } from './send-message.model';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.html',
  standalone: true,
  imports: [FormsModule, NgStyle],
  styleUrls: ['./right-sidebar.css']
})
export class RightSidebar implements OnInit, OnDestroy {

  friendDetails: User[] = [];
  messageDetails: SendMessageWSModel[] = [];
  private subscriptions: Subscription[] = [];
  private currentRoute!: string;

  isChatOpen = false;
  chatPosition: { top: number; left: number } | null = null;
  storedUsername: string | null = null;

  userActivity: { username: string, isOnline: boolean } = { username: '', isOnline: false };
  friend!: User;

  messageBody: SendMessageWSModel = { chatId: '', message: '', username: null, firstName: '', lastName: '' };
  messageText = '';
  receiveMessageFromSockets: SendMessageWSModel = { chatId: '', message: '', username: null, firstName: '', lastName: '' };

  constructor(
    private httpClient: HttpClient,
    private globalEnvironmentVariables: GlobalEnvironmentVariables,
    private router: Router,
    private webSocketService: WebSocketService
  ) {
    const routeSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        this.storedUsername = localStorage.getItem('username');
        this.handleRouteChange(this.storedUsername, this.currentRoute);


        if (this.storedUsername) {
          this.loadFriends(this.storedUsername);
        }
      });
    this.subscriptions.push(routeSub);
  }

  ngOnInit(): void {
    // Aktualizacja statusów online znajomych
    const onlineSub = this.webSocketService.friendsOnline$.subscribe((userActivityDto: UserActivityModel) => {
      const friend = this.friendDetails.find(f => f.username === userActivityDto.username);
      if (friend) {
        friend.isOnline = userActivityDto.isOnline;
      }
      if (userActivityDto.username === this.userActivity.username) {
        this.userActivity.isOnline = userActivityDto.isOnline;
      }
    });
    this.subscriptions.push(onlineSub);
  }

  private loadFriends(username: string): void {
    console.error("ddd "+username)
    const friendsSub = this.httpClient.get<User[]>('http://localhost:8084/api/friends?username=' + username)
      .subscribe({
        next: (data) => {this.friendDetails = data
        console.error(data)},
        error: (err) => console.error('Error while downloading friends:', err)
      });
    this.subscriptions.push(friendsSub);
  }

  private handleRouteChange(loggedUser: string | null, currentRoute: string): void {
    if (currentRoute !== '/login' && currentRoute !== '/register') {
      this.webSocketService.connect(loggedUser);
    }
  }

  openChat(friendDetails: User, chatId: string): void {
    const messagesSub = this.httpClient.get<SendMessageWSModel[]>('http://localhost:8085/api/message/' + chatId)
      .subscribe({
        next: (data) => this.messageDetails = data,
        error: (err) => console.error('Error while downloading messages:', err)
      });
    this.subscriptions.push(messagesSub);

    this.webSocketService.getStompClient().subscribe(`/topic/public/${chatId}`, (msg: any) => {
      const payload: SendMessageWSModel = JSON.parse(msg.body);
      this.receiveMessageFromSockets = payload;
      this.messageDetails = [...this.messageDetails, payload];
    });

    this.friend = friendDetails;
    this.chatPosition = { top: 440, left: 859 };
    this.isChatOpen = true;
  }

  closeChat(): void {
    this.isChatOpen = false;
    this.chatPosition = null;
  }

  onSubmit(chatId: string): void {
    if (!this.storedUsername) return;

    this.messageBody.message = this.messageText;
    this.messageBody.chatId = chatId;
    this.messageBody.username = this.storedUsername;

    this.messageText = '';

    this.httpClient.post<any[]>('http://localhost:8085/api/message', this.messageBody).subscribe();
    this.webSocketService.sendMessage(this.messageBody.message, this.storedUsername, chatId);
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.globalEnvironmentVariables.setGlobalToken(null);
    this.globalEnvironmentVariables.setGlobalUsername(null);
    this.globalEnvironmentVariables.setGlobalSession(false);
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
