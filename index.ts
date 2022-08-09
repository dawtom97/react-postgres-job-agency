import express, { application, Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { nextTick } from 'process';
import morgan from 'morgan';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;


// For connect req body into get and post
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('⚡️Expresowy + TypeScript Server');
});

//Get all companies
app.get('/api/v1/companies', (req:Request,res:Response) => {
   res.status(200).json({
    status: "success",
    data: {
      company: ['lemonbay','ernabo'],
    },
   });
});

//Get specific company
app.get('/api/v1/companies/:id',(req:Request, res:Response) =>{
  console.log(req.params.id);
})

//Create company
app.post('/api/v1/companies',(req:Request,res:Response)=>{
    console.log(req.body)
})

//Update companies
app.put('/api/v1/companies/:id', (req:Request, res:Response)=>{
  console.log(req.params.id);
  console.log(req.body);
})

app.delete("/api/v1/companies/:id", (req:Request,res:Response)=>{
    res.status(204).json({
      status:"success",
    })
})


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});