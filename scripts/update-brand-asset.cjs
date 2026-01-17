const mongoose = require('/Users/cjberno/projects/connie/connie.one/node_modules/.pnpm/mongoose@8.15.1_@aws-sdk+credential-providers@3.840.0/node_modules/mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

async function updateAsset() {
  const [,, assetId, field, value] = process.argv;
  
  if (!assetId || !field) {
    console.log('Usage: node scripts/update-brand-asset.cjs <assetId> <field> <value>');
    process.exit(1);
  }

  const uri = process.env.DATABASE_URI;
  if (!uri) {
    console.error('DATABASE_URI not found');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
  
  let parsedValue = value;
  if (value === 'true') parsedValue = true;
  if (value === 'false') parsedValue = false;
  
  const result = await mongoose.connection.collection('brand-assets').updateOne(
    { _id: new mongoose.Types.ObjectId(assetId) },
    { $set: { [field]: parsedValue, updatedAt: new Date() } }
  );
  
  console.log(result.matchedCount ? `✅ Updated ${field} = "${parsedValue}"` : 'Asset not found');
  await mongoose.disconnect();
}

updateAsset().catch(e => { console.error(e); process.exit(1); });
