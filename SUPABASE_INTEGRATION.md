# Supabase Integration Guide for Duka Store

While the primary backend uses **Node.js, Express, and MySQL**, you may want to integrate **Supabase** to handle specific, complex functionalities quickly and securely. Supabase is built on PostgreSQL, but you can use its isolated services (Auth, Storage, Edge Functions) alongside your existing MySQL setup.

Here is how you can link Supabase to the Duka Store system.

## 1. Using Supabase for File Storage (Images, Logos, Banners)
Instead of handling file uploads directly on your Express server (which eats up bandwidth and disk space), use Supabase Storage.

### Setup Steps:
1. Create a project on [Supabase](https://supabase.com/).
2. Navigate to **Storage** and create a public bucket named `duka-assets`.
3. Get your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Settings > API.

### Integrating in Node.js / React:
Install the client in your backend/frontend:
```bash
npm install @supabase/supabase-js
```

**Upload Logic (Backend Controller/Frontend):**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Function to upload a shop logo or product image
export const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('duka-assets')
    .upload(`products/${fileName}`, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;
  
  // Return the public URL to save into your MySQL database
  const { data: { publicUrl } } = supabase.storage
    .from('duka-assets')
    .getPublicUrl(`products/${fileName}`);
    
  return publicUrl; 
}
```

## 2. Using Supabase for Authentication (Replacing JWT)
If you prefer not to manage JWT tokens, bcrypt, and password resets manually, you can use Supabase Auth.

### How it works alongside MySQL:
1. The user registers/logs in using Supabase Auth on the frontend (`supabase.auth.signUp()`).
2. Supabase handles the password hashing, email verification, and issues an Access Token (JWT).
3. **Webhook/Edge Function:** You set up a Supabase webhook that triggers on user creation, making a `POST` request to your Express server (`/api/auth/sync`) to insert the user into your **MySQL `users` table**.
4. When the frontend sends a request to your Express server, it passes the Supabase JWT. Your Express middleware verifies the Supabase token.

## 3. Real-time Notifications (Supabase Realtime)
If you want live order updates on the Vendor Dashboard without setting up WebSockets/Socket.io on your Node server:

1. Create a simple table in Supabase just for `notifications`.
2. When your Node.js server confirms an M-Pesa payment, it uses the Supabase server-side client to insert a row into the Supabase `notifications` table.
3. The React frontend subscribes to changes on this Supabase table:
```javascript
supabase
  .channel('custom-all-channel')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
    toast.success(`New order received: ${payload.new.message}`);
  })
  .subscribe()
```

## Summary
To properly link Supabase to the current architecture:
1. **Keep MySQL** as your primary relational truth (Orders, Products, Vendors, Analytics) via your Node/Express API.
2. **Add Supabase keys** to your `.env` file (`SUPABASE_URL`, `SUPABASE_ANON_KEY`).
3. **Use Supabase Storage** for user avatars, shop banners, and product images.
4. (Optional) **Use Supabase Auth** to simplify login, storing the Supabase `user_id` in your MySQL tables.
