import RateLimit from 'express-rate-limit';
import Boom from 'boom';

// Memory-based rate limiter (Redis'siz)
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 1000, // IP başına max 1000 istek
  message: 'Too many requests from this IP',
  handler: (req, res, next) => {
    next(Boom.tooManyRequests());
  },
});

export default limiter;
