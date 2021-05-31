An internet forum I created because I wanted to learn MERN. 
The mongodb has 4 collections: users, posts, threads & boards. 

I'm using useContext for global state & using react-query (mostly) for data-fetching.
There are many shared front-end services as well as custom hooks for using the side drawer, a custom auth hook & a custom form hook which checks if a form is valid / invalid.
I also made a hook to store post content specific to each thread so you can navigate around the site without losing your post content on each thread.
Tailwind CSS was used for design.


Some general features include:

JWT auth for register & login.
Auto-logout after a few hours.
Change user password.
Hidden roles for users (basic / vip).
Set a preferred user colour for your posts.
Highlight some text to quote it in your reply.
Reply to multiple posts in a thread within your post.
Click username in a thread to highlight all posts by the user.
Image upload when creating a thread

The project is not currently live, but you can compile and run locally if you add a mongo connect.

TODO:

add recaptcha v2 into form hook.

add logged in users can follow other users & have their follower count displayed.
