const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    
    const s = await Service.deleteOne({ slug: 'mattress-cleaning' });
    console.log('Deleted service:', s);
    
    const t = await Testimonial.deleteMany({ service: 'Mattress Cleaning' });
    console.log('Deleted testimonials:', t);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
