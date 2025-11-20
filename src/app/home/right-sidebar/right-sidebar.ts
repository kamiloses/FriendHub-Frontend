import { Component, OnDestroy, OnInit, signal } from '@angular/core';
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

  // SIGNALS
  friendDetails = signal<User[]>([]);
  messageDetails = signal<SendMessageWSModel[]>([]);

  private subscriptions: Subscription[] = [];
  storedUsername: string | null = null;

  isChatOpen = false;
  chatPosition: { top: number; left: number } | null = null;

  friend!: User;

  messageBody: SendMessageWSModel = {
    chatId: '',
    message: '',
    username: null,
    firstName: '',
    lastName: ''
  };

  messageText = '';

  constructor(
    private httpClient: HttpClient,
    private globalEnvironmentVariables: GlobalEnvironmentVariables,
    private router: Router,
    private webSocketService: WebSocketService
  ) {

    // 🔥 ROUTER WATCHER
    const routeSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.storedUsername = localStorage.getItem('username');

        if (this.storedUsername) {
          this.webSocketService.connect(this.storedUsername);
          this.loadFriends(this.storedUsername);
        }
      });

    this.subscriptions.push(routeSub);
  }

  ngOnInit(): void {

    // 🔥 WEBSOCKET — odbiór statusów online/offline
    const onlineSub = this.webSocketService.friendsOnline$.subscribe(
      (dto: UserActivityModel) => {

        // LOGI DO KONSOLI
        console.log(
          `[STATUS] ${dto.username} jest teraz ${dto.isOnline ? 'ONLINE' : 'OFFLINE'}`
        );

        // IMMUTABLE UPDATE — Angular wykrywa zmianę
        this.friendDetails.update(list =>
          list.map(f =>
            f.username === dto.username
              ? { ...f, isOnline: dto.isOnline }
              : f
          )
        );
      }
    );

    this.subscriptions.push(onlineSub);
  }


  // 🔥 Pobieranie znajomych z API
  private loadFriends(username: string): void {
    const friendsSub = this.httpClient
      .get<User[]>('http://localhost:8084/api/friends?username=' + username)
      .subscribe({
        next: (data) => this.friendDetails.set(data),
        error: (err) => console.error('Error loading friends:', err)
      });

    this.subscriptions.push(friendsSub);
  }


  // 🔥 OTWIERANIE OKNA CZATU
  openChat(friend: User, chatId: string): void {

    // Pobierz wcześniejsze wiadomości
    const msgSub = this.httpClient
      .get<SendMessageWSModel[]>('http://localhost:8085/api/message/' + chatId)
      .subscribe({
        next: (data) => this.messageDetails.set(data),
        error: (err) => console.error('Error loading messages:', err)
      });

    this.subscriptions.push(msgSub);

    // Subskrypcja WebSocket
    this.webSocketService.getStompClient().subscribe(
      `/topic/public/${chatId}`,
      (msg: any) => {
        const payload: SendMessageWSModel = JSON.parse(msg.body);

        this.messageDetails.set([...this.messageDetails(), payload]);
      }
    );

    this.friend = friend;

    this.chatPosition = { top: 440, left: 859 };
    this.isChatOpen = true;
  }


  // 🔥 ZAMYKANIE CZATU
  closeChat(): void {
    this.isChatOpen = false;
    this.chatPosition = null;
  }


  // 🔥 WYSYŁANIE WIADOMOŚCI
  onSubmit(chatId: string): void {
    if (!this.storedUsername) return;

    this.messageBody.message = this.messageText;
    this.messageBody.chatId = chatId;
    this.messageBody.username = this.storedUsername;

    this.messageText = '';

    // REST
    this.httpClient.post(
      'http://localhost:8085/api/message',
      this.messageBody
    ).subscribe();

    // WebSocket
    this.webSocketService.sendMessage(
      this.messageBody.message,
      this.storedUsername,
      chatId
    );
  }


  // 🔥 WYLOGOWANIE
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
