This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
```bash
npx prisma generate
npx prisma migrate dev --name desc
```
```bash
ssh admin@mirobuvi.com.ua
cd core/
git pull
npm i
npx pm2 stop next
npx prisma migrate deploy
npx prisma generate
npm run build
npx pm2 start next


npx pm2 reload all
```

