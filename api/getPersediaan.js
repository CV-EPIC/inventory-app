export default async function handler(req, res) {
  try {
    const { month, year } = req.query;

    const SHEET_ID = process.env.SHEET_ID;
    const API_KEY = process.env.API_KEY;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/PENJUALAN!A:F?key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    const rows = data.values.slice(1);

    const filtered = rows.filter(row => {
      const tgl = new Date(row[0]);

      return (
        tgl.getMonth() + 1 == month &&
        tgl.getFullYear() == year
      );
    });

    res.status(200).json(filtered);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}