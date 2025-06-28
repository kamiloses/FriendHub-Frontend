import {User} from '../../../models/user.model';

export interface PostModel {
  id: string;
   user:User;
  content: string;
  createdAt: string;
  likeCount: number;
  retweetCount: number;
  commentsCount:number;
  retweetedByMe: boolean;
  likedByMe:boolean
  isDeleted: boolean;}
