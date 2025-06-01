export interface Post {
  id: string;
  // user:User;
  content: string;
  createdAt: string;
  likeCount: number;
  retweetCount: number;
  commentsCount:number;
  retweetedByMe: boolean;
  likedByMe:boolean
  isDeleted: boolean;}
