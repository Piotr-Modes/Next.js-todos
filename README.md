# Next.js-todos

Simple todo app using Next.js, Recoil.js, Rebass.js and gorest.co.in as api.

## Getting Started

For this app to fully work you need to generate your own gorest api access token.
You can do it here: https://gorest.co.in/
After that just create a .env.local file in the root directory of this project and paste your api access token
in it like this:
NEXT_PUBLIC_GOREST_API_TOKEN = 'YOUR ACCESS TOKEN HERE'

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
