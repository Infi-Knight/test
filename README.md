[![Netlify Status](https://api.netlify.com/api/v1/badges/adb3887e-4a9f-48c9-b25f-f65ebdfeb2bc/deploy-status)](https://app.netlify.com/sites/inq/deploys)

# Inq

Frontend prototype for a simple review site.

- There are two kinds of users: reviewers and admins.
- reviewer can sign up using username + password
- both reviewer and admin can login to the site using username/password.  
- reviewer can post a review of a product.
- Admin approves review. Review CANNOT be seen on site until it is approved.
- on front page of site, all reviews (that have been approved by admin) get listed.
- reviewer has a dashboard, where he can see reviews written by him and also post new reviews.
- admin has dashboard - where he can see reviews written by everyone and do approval and reject. 

- admin credentials: username- ravi, password- 123456

### Tech stack

React (uses react hooks🥳), GraphQL, GraphCMS.

### Todo

1. Fix cache policies.
2. Need better state management.
3. CSS is leaking from somewhere, fix it.
4. DRY up the code.

### Note

GraphCMS doen't support GraphQL subscriptions yet, so review 'likes' and 'post' won't work.
