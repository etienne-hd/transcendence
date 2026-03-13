// User
export const USER_USERNAME_MIN_LENGTH = 3;
export const USER_USERNAME_MAX_LENGTH = 30;
export const USER_USERNAME_REGEX = /^[a-z0-9]+$/;
export const USER_PASSWORD_MIN_LENGTH = 8;
export const USER_PASSWORD_MAX_LENGTH = 128;
export const USER_EMAIL_MIN_LENGTH = 3;
export const USER_EMAIL_MAX_LENGTH = 320;
export const USER_EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const USER_NAME_MIN_LENGTH = 1;
export const USER_NAME_MAX_LENGTH = 100;
export const USER_BIOGRAPHY_MIN_LENGTH = 1;
export const USER_BIOGRAPHY_MAX_LENGTH = 200;
export const USER_AVATAR_FILE_EXTENSION = ['.jpg', '.jpeg', '.png'];
export const USER_AVATAR_MIN_LENGTH = 7 // 'default'
export const USER_AVATAR_MAX_LENGTH = 7 // 'default'

// Message
export const MESSAGE_CONTENT_MAX_LENGTH = 3000;
