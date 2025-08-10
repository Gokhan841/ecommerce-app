// Memory-based cache (Redis'siz portfolio çözümü)
const cacheStore = new Map();

const cache = {
  route: (expireSeconds = 60) => {
    return (req, res, next) => {
      const key = req.originalUrl || req.url;
      const cached = cacheStore.get(key);
      
      if (cached && Date.now() < cached.expiresAt) {
        return res.json(cached.data);
      }
      
      // Response'u yakalamak için
      const originalSend = res.json;
      res.json = function(data) {
        // Cache'e kaydet
        cacheStore.set(key, {
          data,
          expiresAt: Date.now() + (expireSeconds * 1000)
        });
        
        // Orijinal response'u gönder
        originalSend.call(this, data);
      };
      
      next();
    };
  }
};

export default cache;
