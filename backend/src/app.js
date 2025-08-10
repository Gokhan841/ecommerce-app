import 'dotenv/config';
import './clients/db';
import express from 'express';
import Boom from 'boom';
import cors from 'cors';
import limiter from './rate-limiter';
import routes from './routes';

const app = express();

// CORS ayarları - production'da frontend domain'inizi buraya ekleyin
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app'] // Buraya Vercel domain'inizi ekleyeceksiniz
    : ['http://localhost:3000', 'http://localhost:5173'], // Local development
  credentials: true
};

app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((req, res, next) => {
  return next(Boom.notFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
  console.log(err);

  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }

    return res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is up on port ${PORT}!`));
