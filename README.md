Figma
https://www.figma.com/file/J82kgOlcehdvWXHymYKgyA/Chatter?type=design&node-id=0-1&mode=design&t=uaCsIOhW0VfnnGfp-0

Color palette:
https://coolors.co/00a676-f7f9f9-e0d0c1-a76d60-601700

SVG's
https://www.svgrepo.com/vectors/avatar/2

Future features

- group chats
- video calls

Need to invalidate any login fields with whitespace

## Protected Routes

How do you implement a protected route on the FE? You could
a. check the auth cookie to make sure it exists/is not expired

- this will not work if we set the { httpOnly: true } option when we deal send our cookie, which makes it impossible to interact with the cookie using JS. This is desirable to avoid CSRF attacks,

b. make a request to a BE cookie checker route (w/ or w/o a cache)

- this is a little silly because the user can modify the local JS to avoid this check all together

c. just set a variable like "isLoggedIn" for the session and mark it as "true" on successful login. This can be modified... but like... so can everything else!

So option c is the best as it employs the most (useful) security & requires no backend calls (cheap).

add a modal to the login page that explains what happened if you got booted there

## WebSocket Approach

We will need our websocket to do two things:

1. when messages are unread, the title of the page should be notificatory

- Basically, on login, the title should be set on if there are unreads
- It should be updated if all unreads are removed
- If a websocket hit comes in, the title will be set

1. when a message comes in, locally stored messages should be updated

---

## What do I need before release --

- refactor frontend
  - composition
    - https://legacy.reactjs.org/docs/composition-vs-inheritance.html
  - reducers for Conversation state
  - idk about the websocket thing
- add the "isActive" dot to chatters
- make sure i am not duplicating my websockets + requests
- fix unit tests
- write integration tests
- string up the AWS
