import { sql } from '@vercel/postgres';

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
    await sql`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        attending VARCHAR(50) NOT NULL,
        guests INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const result = await sql`
      INSERT INTO rsvps (name, attending, guests)
      VALUES (${name}, ${attending}, ${guests})
      RETURNING id;
    `;

    return res.status(201).json({ id: result.rows[0].id, success: true });
  } catch (error) {
    console.error('Error saving RSVP:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
