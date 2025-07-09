import jwt from "jsonwebtoken";

const genCookie = (data) => {
  const token = jwt.sign(
    { full_name: data.full_name, email_id: data.email_id, role: data.role },
    process.env.JWT_KEY,
    { expiresIn: "1d" }
  );

  if (!token)
    throw new Error("error in genCookie's token: "+token);

  return token;
  
};

export default genCookie;
