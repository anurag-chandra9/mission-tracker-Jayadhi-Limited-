const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
require('dotenv').config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const email = 'admin@example.com'; 
  const password = 'yourpassword';   
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await Admin.findOneAndUpdate(
    { email },
    { email, password: hashedPassword },
    { upsert: true, new: true }
  );
  console.log('Admin created or updated:', email);
  mongoose.disconnect();
}

createAdmin();
