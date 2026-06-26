import pkg from 'pg';
const { Pool } = pkg;

export default async function handler(req, res) {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (!url) {
    return res.status(500).json({ error: 'No DATABASE_URL or POSTGRES_URL found in environment.' });
  }

  // Mask the password in the URL for safe logging
  const maskedUrl = url.replace(/:([^:@]+)@/, ':***@');

  try {
    const pool = new Pool({
      connectionString: url,
      ssl: {
        rejectUnauthorized: false
      },
      connectionTimeoutMillis: 5000
    });

    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();

    return res.status(200).json({
      success: true,
      message: 'Connected to database successfully',
      url: maskedUrl,
      time: result.rows[0].now
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to connect to database',
      message: error.message,
      code: error.code,
      url: maskedUrl
    });
  }
}
