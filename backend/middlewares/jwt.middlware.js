import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  token = token.split(" ")[1];

  try {
    const { uid, email, role } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;
    req.email = email;
    req.role = role;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
