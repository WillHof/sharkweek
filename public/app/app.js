// var userName
// function onSignIn(googleUser) {
//     let profile = googleUser.getBasicProfile();
//     userName = profile.getName();
//     let userImg = profile.getImageUrl();
//     //need to send id token to database
//     let id_token = googleUser.getAuthResponse().id_token;
//     console.log(profile)
//     return userName
// }
// require("express");
// // Configure the session and session storage.
// const sessionConfig = {
//     resave: false,
//     saveUninitialized: false,
//     secret: config.get('SECRET'),
//     signed: true,
//     store: new DatastoreStore({
//         dataset: new Datastore({ kind: 'express-sessions' }),
//     }),
// };

// app.use(session(sessionConfig));
