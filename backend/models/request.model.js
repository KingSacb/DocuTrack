import { db } from "../database/connection.database.js";

export const RequestModel = {
  async create({ user_id, full_name, document_type, file_url, birth_date, gender }) {
    const result = await db.query(
      `INSERT INTO requests (user_id, full_name, document_type, file_url, birth_date, gender)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, full_name, document_type, file_url, birth_date, gender]
    );

    return result.rows[0];
  },
};
