export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}

export const rrfConfig = {
  // profiles are only stored for non-anonymous users (admins)
  userProfile: 'users',
  useFirestoreForProfile: true,
  // todo: use cloud functions to assign roles
  profileFactory: ({ displayName, isAnonymous }) => ({ displayName, isAdmin: true })
}
