import {User} from '../../../../../models/user.model';

export interface CommentModel {
  id: string;
  content: string;
  createdAt: Date;
  userDetails: User;
  postId: string;
  parentCommentId: string | null;
  numberOfComments: number;
  numberOfLikes: number;
  numberOfReplies: number;

}
