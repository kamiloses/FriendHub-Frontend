## Important Notice

This application is not intended to be a full replacement for existing social media platforms.

Its main goal is to demonstrate backend architecture design, with a focus on microservices, and asynchronous communication between services using **Spring WebFlux** and **RabbitMQ**.




<br><br><h2>Registration-Process</h2>
The first step is the registration process. In the backend, I implemented validation to check if the inputs are valid.
<img width="1810" height="999" alt="image" src="https://github.com/user-attachments/assets/e83ab46e-f7d1-4183-be30-537d9ff24769" />





<br><br> <h2>Login-Process</h2>
After successful registration, you can proceed to login. On the backend side, I implemented JWT, and after a successful login,
<img width="1810" height="999" alt="image" src="https://github.com/user-attachments/assets/21776593-03b9-49c6-b35a-fc1cce08640e" />








<br><br><h2>Posts</h2>
You can write posts. At this moment there is implemented 'findAll' method on the backend side, and on the home page, all the posts will be displayed.
I have implemented functions to like and retweet posts, as well as to undo likes and retweets. You can also check how many likes and retweets a post has, and depending on your choice, the button will change.
<img width="1799" height="953" alt="image" src="https://github.com/user-attachments/assets/22599d7e-b1c7-445d-aab5-88cb972a2d78" />






<br><br><h2>Comments</h2>

Once you click on a post, Angular will send a request to the backend to fetch comments related with the post, and you will be redirected to the post details page, where you can view all the comments associated with that specific post.
<br>You can write comments and response to other comments.



<img width="1799" height="953" alt="image" src="https://github.com/user-attachments/assets/d39a5399-5ddd-47f1-84c1-bb3f78bddd1e" />




<br><br> <h2>Friends</h2>
You can add to friend or remove depending on if user is currenty on your friendList.

<img width="1805" height="1002" alt="image" src="https://github.com/user-attachments/assets/05705b5b-8df6-4ad7-bb8b-821a0944d50c" />




<br><br> <h2>Prometheus</h2>
Implemented gauge metrics to monitor the number of users currently using FriendHub. It is visualised in grafana.
![image](https://github.com/user-attachments/assets/7dfe7447-51c7-41d2-ae25-59260253e2a6)







<br><br><br><br><br>
<h1>NOTE</h1>

<p>
GIFs showing the initial application flow work the same way — only the CSS has been changed.
</p>

<br><br>

<h2>Real-Time Messaging</h2>

<p>
WebSockets were implemented to enable real-time message delivery between users.
</p>

![webstorm64_rq8hfpT7Ih](https://github.com/user-attachments/assets/e2142e01-05f5-4a9f-b7f1-a24527ee048c)


<br><br>

<h2>User Availability</h2>

<p>
It is possible to check whether a user is currently online or offline.
A key part of this feature is the <strong>SessionConnectedEvent</strong>, which is used in event listeners to detect when a user connects to or disconnects from StompJS.
</p>

<img src="https://github.com/user-attachments/assets/704f98c4-51ac-4f0f-83e4-a422708e4ba3" alt="User availability demo">



