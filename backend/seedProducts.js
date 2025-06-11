import mongoose from 'mongoose';
import Product from './src/models/product.js';

// MongoDB connection - Use environment variable if available, otherwise default
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecom';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully to:', mongoURI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Product data - 38 products across 5 categories
const products = [
  // ELECTRONICS CATEGORY (8 products)
  {
    title: "Samsung Galaxy S23 Ultra",
    description: "Latest flagship smartphone with advanced camera system, S Pen support, and 5G connectivity. Features a stunning 6.8-inch Dynamic AMOLED display and powerful Snapdragon processor for exceptional performance.",
    price: 1199,
    photos: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&auto=format"
    ]
  },
  {
    title: "MacBook Pro 16-inch M2",
    description: "Professional laptop with M2 Pro chip, 16GB RAM, and 512GB SSD. Perfect for creative professionals with stunning Liquid Retina XDR display and all-day battery life.",
    price: 2499,
    photos: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format",
      "https://images.unsplash.com/photo-1606248897732-2c5ffe759c04?w=500&auto=format"
    ]
  },
  {
    title: "Dell XPS 13 Plus",
    description: "Ultra-portable laptop with Intel 12th Gen processors, stunning InfinityEdge display, and premium carbon fiber build. Ideal for professionals on the go.",
    price: 1299,
    photos: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&auto=format",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format",
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&auto=format"
    ]
  },
  {
    title: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling wireless headphones with exceptional sound quality, 30-hour battery life, and crystal-clear hands-free calling.",
    price: 399,
    photos: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=500&auto=format",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format"
    ]
  },
  {
    title: "iPad Pro 12.9 M2",
    description: "Most advanced iPad with M2 chip, Liquid Retina XDR display, and support for Apple Pencil 2nd generation. Perfect for creative work and productivity.",
    price: 1099,
    photos: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&auto=format",
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=500&auto=format"
    ]
  },
  {
    title: "Nintendo Switch OLED",
    description: "Enhanced gaming console with vibrant 7-inch OLED screen, improved audio, and 64GB internal storage. Enjoy gaming at home or on the go.",
    price: 349,
    photos: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&auto=format",
      "https://images.unsplash.com/photo-1551515917-130406aa0e66?w=500&auto=format",
      "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500&auto=format"
    ]
  },
  {
    title: "Samsung 55\" 4K Smart TV",
    description: "Crystal UHD 4K Smart TV with HDR10+ support, built-in streaming apps, and Alexa compatibility. Experience stunning picture quality and smart features.",
    price: 799,
    photos: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format",
      "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=500&auto=format",
      "https://images.unsplash.com/photo-1601944177325-f8867652f7d4?w=500&auto=format",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&auto=format"
    ]
  },
  {
    title: "Apple Watch Series 9",
    description: "Advanced smartwatch with health monitoring, fitness tracking, and seamless iPhone integration. Features always-on Retina display and water resistance.",
    price: 429,
    photos: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&auto=format",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&auto=format",
      "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500&auto=format",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format"
    ]
  },

  // FASHION CATEGORY (8 products)
  {
    title: "Nike Air Jordan 1 Retro",
    description: "Iconic basketball sneakers with premium leather construction, classic design, and superior comfort. A timeless style that never goes out of fashion.",
    price: 170,
    photos: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&auto=format",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format"
    ]
  },
  {
    title: "Levi's 501 Original Jeans",
    description: "Classic straight-leg jeans with authentic five-pocket styling, button fly, and premium denim construction. The original jean that started it all.",
    price: 89,
    photos: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format",
      "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=500&auto=format"
    ]
  },
  {
    title: "Adidas Ultraboost 22",
    description: "High-performance running shoes with responsive BOOST midsole, Primeknit upper, and Continental rubber outsole for superior energy return.",
    price: 190,
    photos: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&auto=format",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format"
    ]
  },
  {
    title: "Ralph Lauren Polo Shirt",
    description: "Classic cotton polo shirt with iconic pony logo, two-button placket, and ribbed collar and cuffs. Available in multiple colors for versatile styling.",
    price: 89,
    photos: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4967?w=500&auto=format",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format",
      "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=500&auto=format"
    ]
  },
  {
    title: "Ray-Ban Aviator Sunglasses",
    description: "Timeless aviator sunglasses with crystal lenses, lightweight metal frame, and 100% UV protection. The perfect blend of style and functionality.",
    price: 154,
    photos: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&auto=format",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&auto=format"
    ]
  },
  {
    title: "Patagonia Down Jacket",
    description: "Lightweight and warm down jacket with recycled polyester shell, ethically sourced down fill, and packable design for outdoor adventures.",
    price: 229,
    photos: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&auto=format",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format"
    ]
  },
  {
    title: "Coach Leather Handbag",
    description: "Luxury leather handbag with signature Coach craftsmanship, multiple compartments, and adjustable strap. Perfect for everyday elegance.",
    price: 395,
    photos: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&auto=format",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&auto=format"
    ]
  },
  {
    title: "Casio G-Shock Watch",
    description: "Rugged digital watch with shock resistance, water resistance up to 200M, world time, and multiple alarms. Built to withstand extreme conditions.",
    price: 129,
    photos: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=500&auto=format",
      "https://images.unsplash.com/photo-1594576722512-582bcd46fce4?w=500&auto=format",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format"
    ]
  },

  // HOME & GARDEN CATEGORY (8 products)
  {
    title: "Dyson V15 Detect Vacuum",
    description: "Powerful cordless vacuum with laser dust detection, up to 60 minutes runtime, and advanced filtration system. Perfect for deep cleaning all floor types.",
    price: 749,
    photos: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&auto=format",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format",
      "https://images.unsplash.com/photo-1493663284031-b7e3aaa4b8ae?w=500&auto=format",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format"
    ]
  },
  {
    title: "KitchenAid Stand Mixer",
    description: "Professional-grade stand mixer with 5-quart bowl, 10 speeds, and multiple attachments. Essential for baking enthusiasts and home chefs.",
    price: 379,
    photos: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format",
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&auto=format",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format",
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500&auto=format"
    ]
  },
  {
    title: "Instant Pot Duo 7-in-1",
    description: "Multi-functional electric pressure cooker that replaces 7 kitchen appliances. Features smart programming and safety features for effortless cooking.",
    price: 99,
    photos: [
      "https://images.unsplash.com/photo-1574269910047-be5e8a3bcf75?w=500&auto=format",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&auto=format",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format"
    ]
  },
  {
    title: "Philips Hue Smart Bulbs (4-Pack)",
    description: "Smart LED bulbs with 16 million colors, voice control compatibility, and smartphone app control. Create the perfect ambiance for any occasion.",
    price: 199,
    photos: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&auto=format",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&auto=format",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format"
    ]
  },
  {
    title: "Ninja Foodi Air Fryer",
    description: "Multi-functional air fryer with pressure cooking, dehydrating, and roasting capabilities. Cooks food up to 75% faster with little to no oil.",
    price: 249,
    photos: [
      "https://images.unsplash.com/photo-1574269910047-be5e8a3bcf75?w=500&auto=format",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&auto=format"
    ]
  },
  {
    title: "Pottery Barn Accent Chair",
    description: "Comfortable upholstered accent chair with solid wood frame, high-quality fabric, and classic design. Perfect for living rooms and bedrooms.",
    price: 699,
    photos: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&auto=format",
      "https://images.unsplash.com/photo-1493663284031-b7e3aaa4b8ae?w=500&auto=format"
    ]
  },
  {
    title: "Nespresso Coffee Machine",
    description: "Premium espresso machine with one-touch brewing, automatic shut-off, and compatibility with Nespresso capsules. Enjoy café-quality coffee at home.",
    price: 199,
    photos: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format"
    ]
  },
  {
    title: "Weber Genesis Gas Grill",
    description: "High-performance gas grill with 3 burners, porcelain-enameled cooking grates, and built-in thermometer. Perfect for outdoor entertaining.",
    price: 799,
    photos: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&auto=format",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&auto=format",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&auto=format",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format"
    ]
  },

  // SPORTS & FITNESS CATEGORY (7 products)
  {
    title: "Peloton Bike+",
    description: "Premium exercise bike with rotating HD touchscreen, live and on-demand classes, and immersive workout experience. Transform your home into a fitness studio.",
    price: 2495,
    photos: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format",
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500&auto=format",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&auto=format",
      "https://images.unsplash.com/photo-1599058918765-a780eda07a3e?w=500&auto=format"
    ]
  },
  {
    title: "NordicTrack Treadmill",
    description: "Commercial-grade treadmill with iFit technology, incline training, and interactive coaching. Features powerful motor and cushioned running surface.",
    price: 1799,
    photos: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format",
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500&auto=format",
      "https://images.unsplash.com/photo-1599058918765-a780eda07a3e?w=500&auto=format",
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=500&auto=format"
    ]
  },
  {
    title: "Bowflex Adjustable Dumbbells",
    description: "Space-saving adjustable dumbbells with weight range from 5-52.5 lbs per dumbbell. Quick and easy weight changes with dial system.",
    price: 399,
    photos: [
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=500&auto=format",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format",
      "https://images.unsplash.com/photo-1599058918765-a780eda07a3e?w=500&auto=format",
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500&auto=format"
    ]
  },
  {
    title: "Garmin Forerunner 955",
    description: "Advanced GPS running watch with training metrics, race predictor, and up to 15 days battery life. Perfect for serious runners and triathletes.",
    price: 499,
    photos: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&auto=format",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&auto=format",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format",
      "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500&auto=format"
    ]
  },
  {
    title: "Hydro Flask Water Bottle",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and dishwasher safe.",
    price: 39,
    photos: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format",
      "https://images.unsplash.com/photo-1582739543770-7013f3b41ad7?w=500&auto=format",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&auto=format"
    ]
  },
  {
    title: "Yoga Mat Premium",
    description: "Non-slip yoga mat with superior cushioning and alignment lines. Made from eco-friendly materials with excellent grip for all yoga practices.",
    price: 89,
    photos: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format",
      "https://images.unsplash.com/photo-1599058918765-a780eda07a3e?w=500&auto=format",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format"
    ]
  },
  {
    title: "Wilson Tennis Racket Pro",
    description: "Professional tennis racket with carbon fiber construction, perfect weight distribution, and comfortable grip. Ideal for intermediate to advanced players.",
    price: 179,
    photos: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&auto=format",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format",
      "https://images.unsplash.com/photo-1599058918765-a780eda07a3e?w=500&auto=format",
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=500&auto=format"
    ]
  },

  // BEAUTY & PERSONAL CARE CATEGORY (7 products)
  {
    title: "Dyson Supersonic Hair Dryer",
    description: "Intelligent heat control hair dryer with magnetic attachments, fast drying, and damage protection. Professional salon results at home.",
    price: 429,
    photos: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format",
      "https://images.unsplash.com/photo-1559599238-1a4d90b13050?w=500&auto=format",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format",
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=500&auto=format"
    ]
  },
  {
    title: "Fenty Beauty Foundation",
    description: "Full coverage foundation with 40 inclusive shades, long-wearing formula, and natural matte finish. Perfect for all skin types and tones.",
    price: 36,
    photos: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format",
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=500&auto=format"
    ]
  },
  {
    title: "Olay Regenerist Serum",
    description: "Anti-aging serum with amino-peptides and niacinamide to smooth and firm skin. Reduces fine lines and improves skin texture.",
    price: 28,
    photos: [
      "https://images.unsplash.com/photo-1570554886111-e80fcac6a029?w=500&auto=format",
      "https://images.unsplash.com/photo-1559599238-1a4d90b13050?w=500&auto=format",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format"
    ]
  },
  {
    title: "Philips Sonicare Toothbrush",
    description: "Electric toothbrush with sonic technology, pressure sensor, and smart timer. Removes up to 7x more plaque than manual brushing.",
    price: 199,
    photos: [
      "https://images.unsplash.com/photo-1559599238-1a4d90b13050?w=500&auto=format",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format",
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=500&auto=format",
      "https://images.unsplash.com/photo-1570554886111-e80fcac6a029?w=500&auto=format"
    ]
  },
  {
    title: "Charlotte Tilbury Lipstick",
    description: "Luxurious matte lipstick with intense color payoff, comfortable wear, and iconic packaging. Available in multiple stunning shades.",
    price: 34,
    photos: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format",
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=500&auto=format"
    ]
  },
  {
    title: "The Ordinary Retinol Serum",
    description: "High-strength retinol serum for advanced signs of aging. Helps improve skin texture, reduce fine lines, and promote cell renewal.",
    price: 7,
    photos: [
      "https://images.unsplash.com/photo-1570554886111-e80fcac6a029?w=500&auto=format",
      "https://images.unsplash.com/photo-1559599238-1a4d90b13050?w=500&auto=format",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format"
    ]
  },
  {
    title: "Urban Decay Eyeshadow Palette",
    description: "Professional eyeshadow palette with 12 highly pigmented shades, long-lasting formula, and versatile finishes from matte to metallic.",
    price: 54,
    photos: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format",
      "https://images.unsplash.com/photo-1559599238-1a4d90b13050?w=500&auto=format"
    ]
  }
];

// Seed function
const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`${insertedProducts.length} products inserted successfully`);

    console.log('Product seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run the seeder
const runSeeder = async () => {
  await connectDB();
  await seedProducts();
};

runSeeder(); 