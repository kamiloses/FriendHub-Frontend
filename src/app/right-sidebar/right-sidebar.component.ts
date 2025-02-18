import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { User } from '../models/user-model';
import {NgIf, NgStyle} from '@angular/common';
import {Message} from '../models/message-model';
import {FormsModule} from '@angular/forms';
import {SendMessageModel} from '../models/sendMessage-model';
import {GlobalEnvironmentVariables} from '../models/globalEnvironmentVariables';
import {Router} from '@angular/router';
import {WebSocketService} from '../WebSocketService';
import {UserActivityDto} from '../models/friendStatus-model';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {SendMessageWSModel} from '../models/sendMessageWS-model';

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    FormsModule
  ],
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  protected friendDetails!: User[];
  protected  messageDetails!: Message[];
  private currentRoute!: string;

  constructor(private httpClient: HttpClient, private globalEnvironmentVariables: GlobalEnvironmentVariables,private router: Router,private webSocketService:WebSocketService){
      this.globalEnvironmentVariables.getCurrentRoute$().subscribe(route => {
        this.currentRoute = route;
        this.storedUsername = localStorage.getItem('username');
        this.handleRouteChange(this.storedUsername,this.currentRoute);

      });
  }

  isChatOpen = false;



  private handleRouteChange(loggedUser:string|null,currentRoute:String): void {

    if (currentRoute !== '/login' && currentRoute !== '/register') {
      this.webSocketService.connect(loggedUser);
    }
  }











  chatPosition: { top: number; left: number } | null = null;
    storedUsername:string|null = null;
  ngOnInit(): void {
    this.subscription = this.httpClient
      .get<User[]>('http://localhost:8084/api/friends?username='+this.storedUsername)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.friendDetails = data;
        },
        error: (error) => {
          console.error('Error while downloading data:', error);
        },
      });













    this.subscription = this.webSocketService.friendsOnline$.subscribe((userActivityDto: UserActivityDto) => {
      if (userActivityDto.isOnline) {
        this.userActivity.username = userActivityDto.username;
        this.userActivity.isOnline = userActivityDto.isOnline;
      }else {
        this.userActivity = { username: '', isOnline: false };
      }
      console.log('Updated friends online list:', this.friendDetails);
    })


  }
  userActivity = {username: '', isOnline: false
  };




  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
   friend!:User;
  openChat(friendDetails:User,chatId:string): void {

    this.subscription = this.httpClient
      .get<Message[]>('http://localhost:8085/api/message/' + chatId)
      .subscribe({
        next: (data) => {
          this.messageDetails = data;
        },
        error: (error) => {
          console.error('Error while downloading data:', error);
        },
      });





    this.webSocketService.getStompClient().subscribe(`/topic/public/${chatId}`, (message: any) => {
      this.receiveMessageFromSockets = JSON.parse(message.body);

      const newMessage: Message = {
        chatId: this.receiveMessageFromSockets.chatId,
        content: this.receiveMessageFromSockets.message,
        sender: {
          id: 'defaultId',
          username: this.receiveMessageFromSockets.username || 'Unknown',
          password: 'defaultPassword',
          isOnline: true,
          firstName: this.receiveMessageFromSockets.firstName,
          lastName: this.receiveMessageFromSockets.lastName,
          chatId: this.receiveMessageFromSockets.chatId,
        }, recipient: {
          id: 'defaultRecipientId',
          username: this.storedUsername || 'Unknown',
          password: 'recipientPassword',
          isOnline: false,
          firstName: 'RecipientFirstName',
          lastName: 'RecipientLastName',
          chatId: this.receiveMessageFromSockets.chatId,
        },
        timestamp: new Date(),
        isRead: false,
      };

      this.messageDetails = [...this.messageDetails, newMessage];


    });











    this.friend=friendDetails
    this.chatPosition = {
      top: 440,
      left:859 ,
    };
    this.isChatOpen = true;
  }

  closeChat(): void {
    this.isChatOpen = false;
    this.chatPosition = null;
    this
  }

  messageBody: SendMessageModel = {chatId: '', senderUsername: '', content: ''};
   messageText=''
  onSubmit(chatId:string) {

    this.messageBody.content=this.messageText
    this.messageBody.chatId=chatId;
    this.messageBody.senderUsername=this.storedUsername;


       this.messageText='';
    this.httpClient.post<any[]>('http://localhost:8085/api/message',this.messageBody,{} )
      .subscribe({})








    this.webSocketService.sendMessage(this.messageBody.content,this.storedUsername,chatId);

  }



    logout(): void {

      sessionStorage.clear();
      localStorage.clear();

      this.globalEnvironmentVariables.setGlobalToken(null);
      this.globalEnvironmentVariables.setGlobalUsername(null);
      this.globalEnvironmentVariables.setGlobalSession(false);
      this.router.navigate(['/login'])




   }

  receiveMessageFromSockets:SendMessageWSModel = {chatId: '', message: '', username: null, firstName: '', lastName: ''
  };
















}
