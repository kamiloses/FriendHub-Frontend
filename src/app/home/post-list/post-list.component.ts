import { Component } from '@angular/core';
import {PostModelResponse} from './post/post-response.model';
import {User} from './user.model';
import {FormsModule} from '@angular/forms';
import {Post} from './post/post';

@Component({
  selector: 'app-post-list',
  imports: [
    FormsModule,
    Post
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {


   posts: PostModelResponse[] = [post1, post2, post3];
}


const user1: User = {
  id: 'u1',
  username: 'janek123',
  password: 'secret123',
  isOnline: true,
  firstName: 'Jan',
  lastName: 'Kowalski',
  chatId: 'chat_001'
};

const user2: User = {
  id: 'u2',
  username: 'ania456',
  password: 'pass456',
  isOnline: false,
  firstName: 'Anna',
  lastName: 'Nowak',
  chatId: 'chat_002'
};

const user3: User = {
  id: 'u3',
  username: 'marek789',
  password: 'marek789pass',
  isOnline: true,
  firstName: 'Marek',
  lastName: 'Wiśniewski',
  chatId: 'chat_003'
};

const post1: PostModelResponse = {
  id: 'p1',
  user: user1,
  content: 'Cześć wszystkim! To mój pierwszy post.',
  createdAt: new Date().toISOString(),
  likeCount: 10,
  retweetCount: 2,
  commentsCount: 1,
  retweetedByMe: false,
  likedByMe: true,
  isDeleted: false
};

const post2: PostModelResponse = {
  id: 'p2',
  user: user2,
  content: 'Dzisiaj ładna pogoda, idealna na spacer.',
  createdAt: new Date().toISOString(),
  likeCount: 5,
  retweetCount: 0,
  commentsCount: 0,
  retweetedByMe: false,
  likedByMe: false,
  isDeleted: false
};

const post3: PostModelResponse = {
  id: 'p3',
  user: user3,
  content: 'Kto oglądał ostatni mecz? Niesamowite emocje!',
  createdAt: new Date().toISOString(),
  likeCount: 20,
  retweetCount: 5,
  commentsCount: 3,
  retweetedByMe: true,
  likedByMe: true,
  isDeleted: false
};
