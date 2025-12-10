import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
