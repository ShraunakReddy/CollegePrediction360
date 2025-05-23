import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { parse } from 'csv-parse/sync';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// 📌 Google Sheet CSV URL
const csvUrl = "https://docs.google.com/spreadsheets/d/1IPS_a3mB9TN5p6hA2L7laQ2oaZnXiSe6/export?format=csv&gid=1793981291";



app.get('/api/predict', async (req, res) => {
  try {
    const { rank, category, branchCode } = req.query;

    if (!rank || !category || !branchCode) {
      return res.status(400).json({ error: 'Missing query parameters' });
    }

    const response = await axios.get(csvUrl);
    const records = parse(response.data, { relax_column_count: true });

    // Find header index
    const headerRowIndex = records.findIndex(row => 
      row.some(cell => typeof cell === 'string' && cell.toLowerCase().includes("institute name"))
    );
    if (headerRowIndex === -1) {
      return res.status(500).json({ error: 'Header not found' });
    }

    const header = records[headerRowIndex];
    const data = records.slice(headerRowIndex + 1);
    const df = data.map(row => {
      const obj = {};
      header.forEach((col, idx) => {
        obj[col?.trim()] = row[idx]?.trim();
      });
      return obj;
    });

    // Normalize
    const categoryCol = header.find(col => col?.startsWith(category));
    if (!categoryCol) {
      return res.status(404).json({ error: `Category column '${category}' not found` });
    }

    // Filter by required fields
    const eligible = df
      .filter(row => 
        row['Branch Code']?.toUpperCase() === branchCode.toUpperCase() &&
        !isNaN(Number(row[categoryCol])) &&
        Number(row[categoryCol]) >= Number(rank)
      )
      .map(row => ({
        college: row['Institute Name'],
        branch: row['Branch Name'],
        branchCode: row['Branch Code'],
        closingRank: Number(row[categoryCol])
      }))
      .sort((a, b) => a.closingRank - b.closingRank)
      .slice(0, 60);

    return res.json(eligible);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ College prediction API running at http://localhost:${PORT}`);
});
