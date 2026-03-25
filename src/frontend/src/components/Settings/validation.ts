export const validateEdit = (data: any) => {
  const errors: Record<string, string> = {};

  if (data.email) {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      errors.email = "Please provide a valid email!";
    } else if (data.email.length < 3) {
      errors.email = "Email too short! (3 min)";
    } else if (data.email.length > 320) {
      errors.email = "Email too long! (320 max)";
    }
  }

  if (data.mail) {
    if (data.name.length < 1) {
      errors.name = "Display Name too short! (1 min)";
    } else if (data.name && data.name.length > 100) {
      errors.name = "Display Name too long! (100 max)";
    }
  }

  if (data.username) {
    if (data.username.length < 1) {
      errors.username = "Username too short! (3 min)";
    } else if (data.username.length > 100) {
      errors.username = "Username too long! (30 max)";
    } else if (!/^[a-z0-9]+$/.test(data.username)) {
      errors.username =
        "The username may only contain lowercase letters and digits.";
    }
  }

  if (data.password) {
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]).+$/;
    if (data.password.length < 8) {
      errors.password = "Password too short! (8 min)";
    } else if (data.password.length > 128) {
      errors.password = "Password too long! (128 max)";
    } else if (!passRegex.test(data.password)) {
      errors.password =
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character.";
    }
  }

  return errors;
};
