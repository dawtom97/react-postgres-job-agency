import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './db/index';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;


// For connect req body into get and post
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('⚡️Expresowy + TypeScript Server');
});

//Get all companies
app.get('/api/v1/companies', async (req: Request, res: Response) => {
  try {
    const results = await db.query("SELECT * FROM companies");
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        company: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }

});

//Get specific company
app.get('/api/v1/companies/:id', async (req: Request, res: Response) => {
  console.log(req.params);
  try {
    const result = await db.query('SELECT * FROM companies WHERE id = $1', [req.params.id]);
    res.status(200).json({
      status: "success",
      data: {
        company: result.rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }

})

//Create company
app.post('/api/v1/companies', async (req: Request, res: Response) => {
  const { name, location, price_range } = req.body;
  try {
    const results = await db.query(`INSERT INTO companies (name,location,price_range) VALUES($1,$2,$3) returning *`, [name, location, price_range]);
    res.status(201).json({
      status: "success",
      data: {
        company: results.rows[0]
      }
    })

  } catch (err) {
    console.log(err)
  }
})




//Update companies
app.put('/api/v1/companies/:id', async (req: Request, res: Response) => {
  const { name, location, price_range } = req.body;
  const { id } = req.params;
  try {
    const results = await db.query('UPDATE companies SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *', [name, location, price_range, id]);

    res.status(200).json({
      status: "success",
      data: {
        company: results.rows[0]
      }
    })
  } catch (err) {
    console.log(err);
  }
})




// Company delete
app.delete("/api/v1/companies/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const results = await db.query('DELETE FROM companies WHERE id = $1', [id]);
    res.status(204).json({
      status: "success",
      data: {
        company: results.rows[0]
      }
    })
  } catch (err) {
    console.log(err);
  }

})


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});