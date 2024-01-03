const _ = require("lodash");
const userService = require("../service/userService");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const localStrategy = require("passport-local");

const AppError = require("../helpers/appError.js");
const {
  SUPER_ADMIN,
  ADMIN_HOSPITAL,
  MANAGER_HOSPITAL,
} = require("../constants/roles.const");
// const {
//   experienceDataRefactor,
//   educationDataRefactor,
//   honorDataRefactor,
//   skillDataRefactor,
//   userDataRefactor,
// } = require("../helpers/data-refactor.js");
require("../../../dotEnvInit");

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        let canCreate = false;
        const {
          hospital_id: hospital_id_requester,
          role_id: role_id_requester,
          id: id_requester,
        } = req.headers;
        // const { email } = req.user;
        const {
          first_name,
          last_name,
          id_number,
          date_of_birth,
          phone_number,
          country_id,
          role_id,
          hospital_id,
        } = req.body;
        const query = {
          email: email.toLowerCase(),
        };
        const duplicate = await userService.findUserQuery(query);
        const duplicateUser = duplicate[0];
        if (!_.isEmpty(duplicate)) {
          throw new AppError(400, "User already exists", 400);
        }
        const requestBody = {
          first_name,
          last_name,
          id_number,
          date_of_birth,
          phone_number,
          country_id,
          email,
          password,
        };
        if (role_id_requester === SUPER_ADMIN) {
          //SUPER ADMIN CAN MAKE ANY ROLE ANYWHERE
          canCreate = true;
          requestBody.role_id = role_id;
          requestBody.hospital_id = hospital_id || null;
        }

        if (
          role_id_requester === MANAGER_HOSPITAL &&
          hospital_id_requester === hospital_id &&
          role_id !== MANAGER_HOSPITAL
        ) {
          //MANAGER HOSPITAL CAN MAKE ANY ROLE EXCEPT MANAGER_HOSPITAL AT HIS HOSPITAL
          canCreate = true;
          requestBody.role_id = role_id;
          requestBody.hospital_id = hospital_id_requester;
        }

        if (
          role_id_requester === ADMIN_HOSPITAL &&
          hospital_id_requester === hospital_id &&
          role_id !== ADMIN_HOSPITAL &&
          role_id !== MANAGER_HOSPITAL
        ) {
          //HOSPITAL ADMIN CAN MAKE ANY ROLE EXCEPT MANAGER_HOSPITAL and ADMIN_HOSPITAL AT HIS HOSPITAL
          canCreate = true;
          requestBody.role_id = role_id;
          requestBody.hospital_id = hospital_id_requester;
        }

        if (!canCreate) {
          return done(null, false, {
            message: "Failed to register, make sure you have the right access",
          });
        }
        const user = await userService.register(requestBody);

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const { user, comparePassword } =
          await userService.findUserAndComparePassword(email, password);

        if (!comparePassword)
          return done(null, false, { message: "login failed" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// passport.use(
//   new JWTStrategy(
//     {
//       secretOrKey: process.env.JWT_SECRET,
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     },
//     async (token, done) => {
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

module.exports = passport;
