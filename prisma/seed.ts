import { PrismaClient } from '@prisma/client';
import { PRODUCTS } from '../src/data/products';
import { MOCK_PAST_ORDERS } from '../src/data/constants';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create products
  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        subtitle: product.subtitle,
        description: product.description,
        category: product.category,
        subCategory: product.subCategory,
        collection: product.collection,
        price: product.price,
        stockCount: product.stockCount,
        inStock: product.inStock,
        isNew: product.isNew || false,
        isSale: product.isSale || false,
        isFeatured: product.isFeatured || false,
        isBestSeller: product.isBestSeller || false,
        images: JSON.stringify(product.images),
        colors: JSON.stringify(product.colors),
        sizes: JSON.stringify(product.sizes),
        details: JSON.stringify(product.details),
      },
    });
  }

  console.log('Products seeded.');

  // Create an admin user
  const adminEmail = 'admin@lumora.luxury';
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      // "admin123" hashed using bcrypt
      password: '$2b$10$Epz1VlC./t2Xk.QZk/Q/a.x164/eK50iM7YVb02P8/Qh/QhZk/Q/a', // Placeholder hash
      firstName: 'Lumora',
      lastName: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log('Admin user seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
