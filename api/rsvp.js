import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, attending, guests } = req.body;

    if (!name || !attending || guests === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Ensure table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        attending VARCHAR(50) NOT NULL,
        guests INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await pool.query(
      `INSERT INTO rsvps (name, attending, guests)
       VALUES ($1, $2, $3)
       RETURNING id;`,
      [name, attending, guests]
    );

    return res.status(201).json({ id: result.rows[0].id, success: true });
  } catch (error) {
    console.error('Error saving RSVP:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
