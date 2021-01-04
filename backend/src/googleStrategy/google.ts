import GoogleStategy from 'passport-google-id-token'

import UserServices from '../services/user'
import user from '../services/user'

const googleClientId =
  '872447555823-12hjr6jasgu3eaotcju5adrqhoc7rsor.apps.googleusercontent.com'

const strategy = () => {
  return new GoogleStategy(
    {
      clientID: googleClientId,
    },
    async function (parsedToken: any, googleId: string, done: any) {
      if (
        parsedToken?.payload.email &&
        parsedToken?.payload.email_verified === true
      ) {
        const googlePayload = {
          firstName: parsedToken?.payload.given_name,
          lastName: parsedToken?.payload.family_name,
          email: parsedToken?.payload.email,
          googleId: googleId,
        }

        try {
          const user = await UserServices.findOrCreateUser(googlePayload)

          return done(null, user)
        } catch (error) {
          done(error, false)
        }
      } else {
        done(null, false)
      }
    }
  )
}

export default strategy
