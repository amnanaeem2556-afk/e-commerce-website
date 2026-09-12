import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

app.use(express.json());

// Routes
// 1. Products API
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    // Parse JSON strings back to objects
    const formattedProducts = products.map((p: any) => ({
      ...p,
      images: JSON.parse(p.images),
      colors: JSON.parse(p.colors),
      sizes: JSON.parse(p.sizes),
      details: JSON.parse(p.details),
    }));
    res.json(formattedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product: any = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const formattedProduct = {
      ...product,
      images: JSON.parse(product.images),
      colors: JSON.parse(product.colors),
      sizes: JSON.parse(product.sizes),
      details: JSON.parse(product.details),
    };
    res.json(formattedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// 2. Orders API
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, email, phone, shippingAddress, city, postalCode, paymentMethod, subtotal, discount, shippingFee, total, estimatedDelivery, items } = req.body;

    // Generate Order ID (LUM-XXXXXX)
    const orderNumber = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName,
          email,
          phone,
          shippingAddress,
          city,
          postalCode,
          paymentMethod,
          subtotal,
          discount,
          shippingFee,
          total,
          estimatedDelivery,
          status: 'pending',
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              selectedColor: item.selectedColor,
              selectedSize: item.selectedSize,
              quantity: item.quantity,
              price: item.price
            }))
          }
        },
        include: { items: true }
      });

      // Reduce inventory
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockCount: {
              decrement: item.quantity
            }
          }
        });
      }

      // Create Payment Record
      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          gateway: paymentMethod,
          amount: total,
          status: paymentMethod === 'cod' ? 'pending' : 'pending' // Initial status
        }
      });

      return newOrder;
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order. Please try again.' });
  }
});

app.get('/api/orders/track/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const cleanId = orderId.toUpperCase();

    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { id: cleanId },
          { orderNumber: cleanId }
        ]
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
        payment: true
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'No atelier record matching this ID.' });
    }

    // Format products
    const formattedOrder = {
      ...order,
      items: order.items.map((item: any) => ({
        ...item,
        product: {
          ...item.product,
          images: JSON.parse(item.product.images),
          colors: JSON.parse(item.product.colors),
          sizes: JSON.parse(item.product.sizes),
          details: JSON.parse(item.product.details),
        }
      }))
    };

    res.json(formattedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to track order' });
  }
});

// Mock Payment Callbacks
app.post('/api/payments/easypaisa/callback', async (req, res) => {
  // Mock EasyPaisa Callback
  const { orderId, transactionId, status } = req.body;
  try {
    await prisma.payment.update({
      where: { orderId },
      data: { transactionId, status: status === 'success' ? 'completed' : 'failed' }
    });

    if (status === 'success') {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'confirmed' }
      });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Payment callback failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Lumora API Server running on port ${PORT}`);
});
