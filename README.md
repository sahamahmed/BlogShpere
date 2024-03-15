
**This project is a full stack blog app with core functionalities. It uses appwrite as a backend service and react for frontend. This project is currently under development with the aim to achieve more functionality and better optimization using the best techniques of react.

**This project makes use of reduxToolkit to preserve and manage state of authenticated user and posts.

**Core functionalities include:
   - Allowing users to signup , login , get current user sessions and logout. 
   - Logged in users can see all posts whose status is active.
   - Logged in users can add a blog where they provide a title , content, status and image. 
   - Only the author of post has the authorization to update and delete a specific post.
   - Search functionality is provided on home page to look for specific posts.
   - MyPosts page filters out the posts of the user currently logged in.
   - AllPosts page displays all the posts avaialable by all users.
   - Users can easily navigate between tabs.
   - Users that are not logged in can only visit Home , Login and Signup pages.
   - Any changes to posts and users are immediately reflected back in the appwrite database.
