import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

// /api/v1/users/register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validar existencia de los campos
    if (!username || !email || !password) {
      return res.status(400).json({
        ok: false,
        msg: "Todos los campos son obligatorios: email, username y password",
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        msg: "Formato de correo electrónico inválido",
      });
    }

    // Validar longitud de password
    if (password.length < 6) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    // Validar longitud de username
    if (username.length < 3) {
      return res.status(400).json({
        ok: false,
        msg: "El nombre de usuario debe tener al menos 3 caracteres",
      });
    }

    // Verificar si ya existe el usuario
    const existingUser = await UserModel.findOneByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        ok: false,
        msg: "Este correo ya está registrado",
      });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      username,
      role: "USER"
    });

    // Crear token
    const token = jwt.sign(
      { 
        uid: newUser.uid,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ ok: true, msg: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};


// /api/v1/users/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar existencia de campos
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        msg: "Correo y contraseña son obligatorios",
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        msg: "Correo electrónico inválido",
      });
    }

    // Buscar usuario
    const user = await UserModel.findOneByEmail(email);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        msg: "Credenciales incorrectas",
      });
    }

    // Generar token
    const token = jwt.sign(
      { 
        uid: user.uid,
        email: user.email,
        role: user.role, 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log(token)

    return res.status(200).json({ ok: true, msg: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

const profile = async(req, res) => {
  try {

    const user = await UserModel.findOneByEmail(req.email)
    return res.json({ok: true, msg: user})
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: "Error server",
    });
  }
}

export const UserController = {
  register,
  login,
  profile
};
