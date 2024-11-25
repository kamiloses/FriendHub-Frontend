import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { User } from '../models/user-model';
import {NgIf, NgStyle} from '@angular/common';
import {Message} from '../models/message-model';
import {FormsModule} from '@angular/forms';
import {SendMessageModel} from '../models/sendMessage-model';

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

  constructor(private httpClient: HttpClient) {}

  isChatOpen = false;


  chatPosition: { top: number; left: number } | null = null;
    storedUsername:string|null = null;
  ngOnInit(): void {
    this.storedUsername = localStorage.getItem('username');

    console.log("abc "+this.storedUsername);
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






    this.subscription = this.httpClient
      .get<Message[]>('http://localhost:8085/api/message/'+this.storedUsername)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.messageDetails = data;
        },
        error: (error) => {
          console.error('Error while downloading data:', error);
        },
      });






  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
   friend!:User;
  openChat(friendDetails:User): void {

this.friend=friendDetails
    this.chatPosition = {
      top: 420,
      left:1250 ,
    };
    this.isChatOpen = true;
  }

  closeChat(): void {
    this.isChatOpen = false;
    this.chatPosition = null;
  }

   messageBody!:SendMessageModel;
   messageText=''
  onSubmit() {

      this.messageText=''
 console.log("hej");
 //    this.messageBody.senderUsername=this.storedUsername

    // this.messageBody.content=this.messageText


    // this.httpClient.post<any[]>('http://localhost:8085/api/message', )
    //   .subscribe({
    //     next: (data) => {
    //       console.log('Wiadomość została wysłana:', data);
    //       this.messageDetails = data;
    //       this.messageText = '';
    //     },
    //     error: (error) => {
    //       console.error('Błąd podczas wysyłania wiadomości:', error);
    //     },

  }


















}
