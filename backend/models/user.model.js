import { db } from "../database/connection.database.js";

const create = async ({ email, password, username, role = "USER" }) => {
  const query = {
    text: `
        INSERT INTO users (email, password, username, role)
        VALUES ($1, $2, $3, $4)
        RETURNING email, username, uid, role
        `,
    values: [email, password, username, role],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findOneByEmail = async (email) => {
  const query = {
    text: `
        SELECT * FROM users
        WHERE EMAIL = $1
        `,
    values: [email],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

export const UserModel = {
  create,
  findOneByEmail,
};
