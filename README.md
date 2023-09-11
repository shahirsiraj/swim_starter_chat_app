Swim Starter Technical Assessment

Production Link : https://swim-starter-chat-6bdscq9sf-silfarri.vercel.app/

No other steps are required (i.e no need to git clone or npm install anything) 

Tech used: Firebase and NextJs 13. Firestore was used to create documents for the rooms, messages and users with real time updates. Google OAuth was used as an authentication method (Since it can be easily implemented as a provider on Firebase) 


User Stories: 
- User logs in using Google
- User can create individual rooms
- User can start chats with other users who have registered
- User can send messages to these users individually
- User can also send messages to global chat rooms that can act as group chats
  
Future improvements: 
- sending images/audio files 
- cleaning up component trees/ code quality 
- implementing private chat rooms through permissions/protected routes
- Potential for migrating to NodeJS and MongoDB stack for better scalability 


Considerations
-initially considered usin WebSockets e.g socket.io but due to limited time did not manage to do so as Firebase has ease of implementation. Firebase is easily scalable as is and for the purpose of this assessment it is sufficient. Would consider a NodeJs and a NoSQL db for production/building a specialized app. 
