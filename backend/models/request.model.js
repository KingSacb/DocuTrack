import { db } from "../database/connection.database.js";

export const RequestModel = {
  async create({ user_id, full_name, document_type, file_url, birth_date, gender, reason }) {
  const result = await db.query(
    `INSERT INTO requests 
     (user_id, full_name, document_type, file_url, birth_date, gender, reason)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [user_id, full_name, document_type, file_url, birth_date, gender, reason]
  );
    return result.rows[0];
  },
};

findByUserEmail: async (email) => {
  const result = await db.any(
    `SELECT r.* FROM requests r
     JOIN users u ON u.uid = r.user_id
     WHERE u.email = $1
     ORDER BY r.created_at DESC`,
    [email]
  );
  return result;
}
