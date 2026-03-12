# Next.js Backend Infrastructure for Duka Store (MySQL)

This document provides the complete, robust Next.js backend infrastructure (using the **App Router**) for Duka Store, connected directly to your existing **MySQL** database.

---

## 1. Project Initialization & Dependencies

To create the backend as a dedicated Next.js project (or you can use this in your existing frontend if you want a monolith, but here we assume a dedicated Next.js API):

```bash
npx create-next-app@latest backend
```
*Select: TypeScript (Yes), ESLint (Yes), Tailwind (No), `src/` directory (Yes), App Router (Yes).*

### Install Backend Dependencies:
```bash
npm install mysql2 jsonwebtoken bcryptjs multer cors @sendgrid/mail nodemailer africastalking axios
npm install -D @types/jsonwebtoken @types/bcryptjs @types/multer @types/nodemailer
```

> **Why `mysql2`?** Because we are not using Prisma (to stay close to raw SQL design), `mysql2` allows Connection Pooling with standard SQL queries and Promises.

---

## 2. Environment Variables (`.env.local`)

Never commit this file.

```env
# Server
PORT=3000

# MySQL Connection (Using pool)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=duka_store
DB_PORT=3306

# Supabase Keys (For Storage/Realtime)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# JWT Auth
JWT_SECRET=super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Safari Daraja API (M-PESA)
DARAJA_CONSUMER_KEY=your_key
DARAJA_CONSUMER_SECRET=your_secret
DARAJA_SHORTCODE=174379
DARAJA_PASSKEY=your_passkey
DARAJA_CALLBACK_URL=https://your-domain.ngrok.io/api/payments/callback
DARAJA_ENV=sandbox

# Africa's Talking (SMS)
AT_API_KEY=your_at_key
AT_USERNAME=sandbox

# Sendgrid / Nodemailer (Email)
SENDGRID_API_KEY=your_key
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your@gmail.com
MAIL_PASS=your_app_pass
```

---

## 3. Database Connection Pool (`src/lib/db.js`)

Using `mysql2/promise` ensures we use connection pooling, which is critical for Serverless/Next.js environments to prevent "Too many connections" errors.

```javascript
// src/lib/db.js
import mysql from 'mysql2/promise';

let pool;

export function getDbConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}
```

---

## 4. Middleware & Utility Functions

### 4.1 Route Protection (`src/lib/auth.js`)
Next.js App Router API endpoints need a utility to verify JWT tokens manually.

```javascript
// src/lib/auth.js
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function protect(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Not authorized', status: 401 };
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded, status: 200 };
  } catch (error) {
    return { error: 'Token invalid or expired', status: 401 };
  }
}
```

---

## 5. Next.js API Routes (App Router)

Folder structure for APIs:
```
src/
└── app/
    └── api/
        ├── auth/
        │   ├── register/route.js
        │   └── login/route.js
        ├── products/
        │   └── route.js
        ├── orders/
        │   └── route.js
        └── payments/
            ├── stk/route.js
            └── callback/route.js
```

### 5.1 Authentication endpoints (`src/app/api/auth/register/route.js`)

```javascript
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDbConnection } from '@/lib/db';

export async function POST(req) {
  try {
    const { name, email, password, phone, role } = await req.json();
    const db = getDbConnection();

    // Check if user exists
    const [existing] = await db.execute('SELECT email FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const assignedRole = role || 'customer';

    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone, assignedRole]
    );

    return NextResponse.json({ message: 'User created', id: result.insertId }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
```

### 5.2 Login (`src/app/api/auth/login/route.js`)

```javascript
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '@/lib/db';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const db = getDbConnection();

    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Include role in token
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return NextResponse.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
```

### 5.3 Fetching / Creating Products (`src/app/api/products/route.js`)

```javascript
import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { protect } from '@/lib/auth';

// GET all products (Public)
export async function GET() {
  try {
    const db = getDbConnection();
    const [products] = await db.execute(`
      SELECT p.*, s.name as shop_name 
      FROM products p 
      JOIN shops s ON p.shop_id = s.id 
      WHERE p.status = 'active'
    `);
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST new product (Protected - Vendor only)
export async function POST(req) {
  const auth = await protect(req);
  if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });
  if (auth.user.role !== 'vendor' && auth.user.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const data = await req.json();
    const db = getDbConnection();

    const [result] = await db.execute(
      'INSERT INTO products (shop_id, title, description, price, stock, category, images) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [data.shop_id, data.title, data.description, data.price, data.stock, data.category, JSON.stringify(data.images || [])]
    );

    return NextResponse.json({ message: 'Product created', id: result.insertId }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
```

---

## 6. Daraja & Africa's Talking Services

Create a services folder `src/lib/services/`.

### M-Pesa Integration (`src/lib/services/daraja.js`)

```javascript
import axios from 'axios';

const DARAJA_BASE = process.env.DARAJA_ENV === 'production' 
  ? 'https://api.safaricom.co.ke' 
  : 'https://sandbox.safaricom.co.ke';

export const stkPush = async (phone, amount, orderRef) => {
  // 1. Get Token
  const credentials = Buffer.from(`${process.env.DARAJA_CONSUMER_KEY}:${process.env.DARAJA_CONSUMER_SECRET}`).toString('base64');
  const tokenRes = await axios.get(`${DARAJA_BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` }
  });
  const token = tokenRes.data.access_token;

  // 2. Generate Password
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
  const password = Buffer.from(`${process.env.DARAJA_SHORTCODE}${process.env.DARAJA_PASSKEY}${timestamp}`).toString('base64');

  // 3. Fire Push
  const res = await axios.post(
    `${DARAJA_BASE}/mpesa/stkpush/v1/processrequest`,
    {
      BusinessShortCode: process.env.DARAJA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.ceil(amount),
      PartyA: phone, // e.g. 254700000000
      PartyB: process.env.DARAJA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.DARAJA_CALLBACK_URL,
      AccountReference: `DUKA-${orderRef}`,
      TransactionDesc: 'DukaStore Checkout',
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
};
```

**M-Pesa Webhook Endpoint (`src/app/api/payments/callback/route.js`):**

```javascript
import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { sendSMS } from '@/lib/services/sms';

export async function POST(req) {
  const { Body: { stkCallback } } = await req.json();
  
  if (stkCallback.ResultCode === 0) {
    const items = stkCallback.CallbackMetadata.Item;
    const amount = items.find(i => i.Name === 'Amount').Value;
    const receipt = items.find(i => i.Name === 'MpesaReceiptNumber').Value;
    const phone = items.find(i => i.Name === 'PhoneNumber').Value;

    // 1. Update Order in MySQL
    const db = getDbConnection();
    await db.execute(
      'INSERT INTO payments (amount, mpesa_receipt, status) VALUES (?, ?, ?)',
      [amount, receipt, 'completed']
    );

    // 2. Send Customer SMS
    await sendSMS(phone, `✅ Confirmed. KES ${amount} received. M-Pesa Receipt: ${receipt}. Thank you for shopping on Duka Store!`);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
}
```

---

## 7. Supabase Architecture Connection

Since we are using MySQL + Next.js as the core API framework, **how does Supabase fit into this architecture?**

We will use **Supabase purely as a Storage and Realtime PaaS** rather than a database.

### 7.1 Setup Supabase Client (`src/lib/supabaseClient.js`)

```bash
npm install @supabase/supabase-js
```

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### 7.2 Connecting Supabase for File Uploads (Images/Logos)

Instead of using `multer` and storing files directly on your Next.js file system (which breaks in Vercel/Netlify), upload directly from the frontend to Supabase, get the public URL, and save *that URL* to your MySQL database via Next.js.

**In Frontend/Next.js Client Components:**
```javascript
import { supabase } from '@/lib/supabaseClient';

export async function uploadProductImage(file) {
  const fileName = `products/${Date.now()}-${file.name}`;
  
  // 1. Upload to Supabase Storage Bucket ("duka-assets")
  const { data, error } = await supabase
    .storage
    .from('duka-assets')
    .upload(fileName, file);

  if (error) throw error;

  // 2. Get Public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from('duka-assets')
    .getPublicUrl(fileName);

  // 3. Finally, POST to Next.js API to save `publicUrl` in MySQL products table
  await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify({ images: [publicUrl] /* ...other data */ })
  });

  return publicUrl;
}
```

### 7.3 Using Supabase for Realtime Events

MySQL doesn't support easy WebSockets. Supabase does. Let's say we want a Vendor to instantly see when an M-Pesa payment completes.

1. Create a `notifications` table in Supabase PostgreSQL (only used for temporary events).
2. Enable Realtime on the `notifications` table in the Supabase Dashboard.
3. When the Next.js `mpesa/callback` route fires, *also* insert a row into Supabase.

**Next.js Backend (Webhook Router):**
```javascript
import { supabase } from '@/lib/supabaseClient';

// Inside mpesa callback...
await supabase.from('notifications').insert({
  vendor_id: vendorId,
  message: `Payment received: KES ${amount} for order Ref: ${receipt}`
});
```

**Frontend (Vendor Dashboard React Component):**
```javascript
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';

useEffect(() => {
  const channel = supabase
    .channel('realtime_vendor_orders')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'notifications' }, 
      (payload) => {
        // Checking if notification belongs to the logged-in vendor 
        if(payload.new.vendor_id === currentVendorId) {
            toast.success(payload.new.message);
        }
      })
    .subscribe();

  return () => { supabase.removeChannel(channel) };
}, []);
```

### Architecture Summary:
1. **Frontend:** React + Tailwind
2. **Backend API:** Next.js App Router API endpoints (`/app/api/...`)
3. **Database:** MySQL via `mysql2` connection pooling
4. **Media Storage & Realtime:** Supabase
5. **Gateway Integrations:** Daraja (M-Pesa) and Africa's Talking (SMS) invoked securely via Next.js backend Server actions.
