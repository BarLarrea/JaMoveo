export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
    // At least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(String(password));
}

export function validateRegisterForm({ firstName, lastName, email, password, bandRole, instrument, isAdmin, adminCode }) {
    if (!firstName || !lastName || !email || !password) {
      return "Please fill in all required fields.";
    }

    if(!isAdmin && !bandRole) {
      return "Please select your band role.";
    }
  
    if (!validateEmail(email)) {
      return "Please enter a valid email address.";
    }
  
    if (!validatePassword(password)) {
      return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
    }
  
    if (!isAdmin && bandRole === "player" && !instrument) {
      return "Please select an instrument if you are a music player.";
    }
  
    if (isAdmin && !adminCode) {
      return "Please enter the admin code to register as an admin.";
    }
  
    return null;
  }
  
