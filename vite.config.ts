import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ** (for set web to  https)
// ** The Vite documentation suggest using their official package instead: @vitejs/plugin-basic-ssl
import basicSsl from '@vitejs/plugin-basic-ssl'


// ** for getting env files
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({

  plugins: [
      react(),
      // This is for your dev environment, don't use this on production.
      // You need your own certificate in production
      basicSsl()
  ],
  define: {
      // we have to set key : value for call by process.env.<key>
      'process.env.LIFF_ID': JSON.stringify(process.env.LIFF_ID),
  },
  base : ""
})



