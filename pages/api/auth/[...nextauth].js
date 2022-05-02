import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter"
import { sendVerificationRequest } from '@Utils/signin-email';
import * as entities from "@lib/entities" 

const db = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: entities,
}


// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const clientCredentials = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// const firestore = (
//   firebase.apps[0] ?? firebase.initializeApp(clientCredentials)
// ).firestore();

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAILSV_HOST,
        port: process.env.EMAILSV_PORT,
        auth: {
          user: process.env.EMAILSV_USER,
          pass: process.env.EMAILSV_PASS,
        },
      },
      from: process.env.EMAILSV_FROM,
      sendVerificationRequest : sendVerificationRequest,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],


  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
  // Choose how you want to save the user session.
  // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
  // If you use an `adapter` however, we default it to `"database"` instead.
  // You can still force a JWT session by explicitly defining `"jwt"`.
  // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  // which is used to look up the session in the database.
    strategy: 'database',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },


  pages: {
    signIn: '/auth/signin', // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    error: '/auth/signin', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // Used for check email page
    //newUser: '/member/dashboard' // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn(user, account, profile, email, credentials) {
      console.log(user);
      return true;
    },
    // async redirect(url, baseUrl) { return baseUrl },
    // async session(session, user) { return session },
    // async jwt(token, user, account, profile, isNewUser) { return token }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  adapter: TypeORMLegacyAdapter(db),

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: 'light',

  // Enable debug messages in the console if you are having problems
  //debug: true,
});
