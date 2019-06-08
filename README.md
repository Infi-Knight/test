# Test

Screening task for Redcarpetup internship. A prototype web app for a simple review site. The app is highly insecure owing to limitations imposed by CMS and absence of a proxy server to handle security. 

### Tech stack

React (uses react hooks🥳), GraphQL, GraphCMS. Deployed using Now - Zeit.

### Todo

1. Fix cache policies.
2. Need better state management.
3. CSS is leaking from somewhere, fix it.
4. DRY up the code.

### Note

GraphCMS doen't support GraphQL subscriptions yet, so review 'likes' and 'post' won't work.