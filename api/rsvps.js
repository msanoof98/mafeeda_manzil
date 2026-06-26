import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Ensure table exists (in case GET is called before POST)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        attending VARCHAR(50) NOT NULL,
        guests INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await pool.query(`SELECT * FROM rsvps ORDER BY created_at DESC`);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
