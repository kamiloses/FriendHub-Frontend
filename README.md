 #  <h1 align="center">💬 FriendHub-Frontend 💬</h1>

<br><br><br><br>
 30.05.2025
<h3>⚠️ This is my old Angular project, where the CSS and TypeScript files were not written the way I initially intended. Currently, I am writing new frontend code for the FriendHub backend.⚠️</h3>



<br><br><h2>Registration-Process</h2>
The first step is the registration process. In the backend, I implemented validation to check if the inputs are valid.
![image](https://github.com/user-attachments/assets/1bd10fa2-d058-4970-b405-3e852e7a99a5)




<br><br> <h2>Login-Process</h2>
After successful registration, you can proceed to login. On the backend side, I implemented JWT, and after a successful login,
you receive a token. However, on the frontend side, I did not implement this.
![image](https://github.com/user-attachments/assets/d09dd208-7f34-43bb-8468-1edcc635f409)




<br><br><h2>Posts</h2>
You can write posts. At this moment there is implemented 'findAll' method on the backend side, and on the home page, all the posts will be displayed.
I have implemented functions to like and retweet posts, as well as to undo likes and retweets. You can also check how many likes and retweets a post has, and depending on your choice, the button will change.
![image](https://github.com/user-attachments/assets/0682b6a6-0ed7-4e9f-8b86-213ea7f1fcc8)










<br><br><h2>Comments</h2>

Once you click on a post, Angular will send a request to the backend to fetch comments related with the post, and you will be redirected to the post details page, where you can view all the comments associated with that specific post.
<br>You can write comments and response to other comments.

![image](https://github.com/user-attachments/assets/4ce59cda-b116-482d-b9eb-ffdffe89a866)




<br><br> <h2>Friends</h2>
You can add to friend or remove depending on if user is currenty on your friendList.
![image](https://github.com/user-attachments/assets/e43536f0-f0d2-4dfe-8a9c-51fd2e5a0c1b)


<br><br>
<br> 02.01.2025<br><h2>Real-Time Messaging</h2>
I implemented WebSockets, which are responsible for sending messages in real-time.
![webstorm64_rq8hfpT7Ih](https://github.com/user-attachments/assets/e2142e01-05f5-4a9f-b7f1-a24527ee048c)




<br><br><h2>User Availability</h2>
There is also posibility to check whether user is online or offline.
Very handy here became the 'SessionConnectedEvent,' which I used in event listeners to check whether a user has connected to or disconnected from StompJS.
![msedge_491GLTYdwN](https://github.com/user-attachments/assets/704f98c4-51ac-4f0f-83e4-a422708e4ba3)


