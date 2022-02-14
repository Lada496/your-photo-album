# Your Photo Album

## Description

A personal photo storage with a searching feature.

## Purpose
* Prepare for a freelance project ['Jose's Photograph Portfolio'](https://joseheart8.netlify.app/)

### Plans of SPA pages for the freelance project and this project
**1. the original plan for the project**
<img width="1131" alt="Screen Shot 2022-02-14 at 10 16 57" src="https://user-images.githubusercontent.com/67321065/153922766-5919da7e-70c6-4250-b16e-b721903b7260.png">
👍 the owner can manage photos by himself after we deply the portfolio website<br/>
👎 It costs maintenance fee　because the data transportation restliction of Firebase storage free plan is not enough as a photogragh portfolio<br />

**2. acctual SPA pages for the project**
<img width="1138" alt="Screen Shot 2022-02-14 at 10 16 44" src="https://user-images.githubusercontent.com/67321065/153922793-309f6d38-3898-4d98-94a1-72496defe601.png">
👍 Low cost<br/>
👎 It is impossible to update the portfolio photo data by himself<br />
**3. SPA pages for this project**
<img width="1131" alt="Screen Shot 2022-02-14 at 10 17 12" src="https://user-images.githubusercontent.com/67321065/153922845-01948138-a19c-4778-9861-21a1406a138e.png">
I decided to create this website as a personal photo album.
## Challenging parts
* Implementation of public page and private page depending on users login status: I refered [this react router page](https://reactrouter.com/docs/en/v6/examples/auth) and [this example](https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src/App.tsx)
* Use new tools such as axios and useForm hook: I wrote aricles about them respectively ([Comparison between fetch and axios
](https://dev.to/lada496/comparison-between-fetch-and-axios-4np2), [Form management with useForm (error messaging and data validation)](https://medium.com/@lada496/react-hooks-useform-bd6b91fd9637))

## Screenshots
<img width="888" alt="Screen Shot 2022-01-04 at 21 53 18" src="https://user-images.githubusercontent.com/67321065/148167810-451f742c-9e6b-4a2f-86d9-40b615b81c56.png">
<img width="887" alt="Screen Shot 2022-01-04 at 21 53 39" src="https://user-images.githubusercontent.com/67321065/148167892-48d75c5b-709d-49e1-b1e4-f4de1ac7485b.png">
<img width="510" alt="Screen Shot 2022-01-04 at 21 54 59" src="https://user-images.githubusercontent.com/67321065/148167912-d71d87ed-4dcb-4457-b713-9de94a633040.png">
<img width="501" alt="Screen Shot 2022-01-04 at 21 55 23" src="https://user-images.githubusercontent.com/67321065/148167931-d675c2b1-e5be-4cd7-b407-031641307336.png">

## Stack

- React
- React Hooks
- React Router
- useForm
- context API
- Sass
- React Bootstrap
- Axios
- Firebase

## Future Plans

- Use localstorage to save authentication status so that user do not lose login status because of just one refresh
- Add user management features such as changing password
- Add categories for photos

## Links

- Demo: https://your-photo-album-db1aeb.netlify.app

- Reference:
  - https://firebase.google.com/docs/database/security
  - https://github.com/react-hook-form/react-hook-form/tree/master/examples
  - https://reactrouter.com/docs/en/v6/examples/auth
  - https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
