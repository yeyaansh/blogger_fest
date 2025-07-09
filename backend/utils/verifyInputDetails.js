import validator from "validator";
const verifyInputDetails = (data) => {
  if (!data.full_name || !data.email_id || !data.password || !data.role) {
    throw new Error("Missing Credentials");
  }

  const isValidEmail = validator.isEmail(data.email_id);
  if (!isValidEmail) throw new Error("Invalid Email!");

  const isStrongPassword = validator.isStrongPassword(data.password);
  if (!isStrongPassword) throw new Error("Weak Password");
};

export default verifyInputDetails;
