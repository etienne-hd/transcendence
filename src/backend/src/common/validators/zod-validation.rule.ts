import z from 'zod';
import {
  MESSAGE_CONTENT_MAX_LENGTH,
  USER_AVATAR_MAX_LENGTH,
  USER_AVATAR_MIN_LENGTH,
  USER_BIOGRAPHY_MAX_LENGTH,
  USER_BIOGRAPHY_MIN_LENGTH,
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_EMAIL_REGEX,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
  USER_USERNAME_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
  USER_USERNAME_REGEX,
} from '../constants/constants';

// User
export const ZOD_USER_USERNAME = z
  .string()
  .min(USER_USERNAME_MIN_LENGTH, {
    message: `Username too short! (${USER_USERNAME_MIN_LENGTH} min)`,
  })
  .max(USER_USERNAME_MAX_LENGTH, {
    message: `Username too long! (${USER_USERNAME_MAX_LENGTH} max)`,
  })
  .regex(USER_USERNAME_REGEX, {
    message: 'The username may only contain lowercase letters and digits.',
  });
export const ZOD_USER_PASSWORD = z
  .string()
  .min(USER_PASSWORD_MIN_LENGTH, {
    message: `Password too short! (${USER_PASSWORD_MIN_LENGTH} min)`,
  })
  .max(USER_PASSWORD_MAX_LENGTH, {
    message: `Password too long! (${USER_PASSWORD_MAX_LENGTH} min)`,
  })
  .regex(/.*[a-z].*/, {
    message: 'Password must contains at least one lower-case character!',
  })
  .regex(/.*[A-Z].*/, {
    message: 'Password must contains at least one upper-case character!',
  })
  .regex(/.*\d.*/, {
    message: 'Password must contains at least one number!',
  })
  .regex(/.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/, {
    message: 'Password must contains at least one special character!',
  });
export const ZOD_USER_EMAIL = z
  .string()
  .min(USER_EMAIL_MIN_LENGTH, {
    message: `Email too short! (${USER_EMAIL_MIN_LENGTH} min)`,
  })
  .max(USER_EMAIL_MAX_LENGTH, {
    message: `Email too long! (${USER_EMAIL_MAX_LENGTH} max)`,
  })
  .regex(USER_EMAIL_REGEX, { message: 'Please provide a valid email!' });
export const ZOD_USER_NAME = z
  .string()
  .min(USER_NAME_MIN_LENGTH, {
    message: `Name too short! (${USER_NAME_MIN_LENGTH} min)`,
  })
  .max(USER_NAME_MAX_LENGTH, {
    message: `Name too long! (${USER_NAME_MAX_LENGTH} max)`,
  });
export const ZOD_USER_BIOGRAPHY = z
  .string()
  .min(USER_BIOGRAPHY_MIN_LENGTH, {
    message: `Biography too short! (${USER_BIOGRAPHY_MIN_LENGTH} min)`,
  })
  .max(USER_BIOGRAPHY_MAX_LENGTH, {
    message: `Biography too long! (${USER_BIOGRAPHY_MAX_LENGTH} max)`,
  });

export const ZOD_USER_AVATAR = z
  .string()
  .min(USER_AVATAR_MIN_LENGTH, {
    message: `Avatar too short! (${USER_AVATAR_MIN_LENGTH} min)`,
  })
  .max(USER_AVATAR_MAX_LENGTH, {
    message: `Avatar too long! (${USER_AVATAR_MAX_LENGTH} max)`,
  });

// Message
export const ZOD_MESSAGE_CONTENT = z.string().max(MESSAGE_CONTENT_MAX_LENGTH, {
  message: `Message too long! (${MESSAGE_CONTENT_MAX_LENGTH} max)`,
});
