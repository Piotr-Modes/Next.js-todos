import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        main
        <Link as="todo-details/1234" href="/todo-details/[id]">
          <a>details</a>
        </Link>
      </main>
    </div>
  );
}
