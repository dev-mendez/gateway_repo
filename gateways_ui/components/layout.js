import Navbar from './navbar';
import Footer from './footer';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Gateway app" />
        <link rel="icon" href="/favicon.ico" />
        <title>Gateway app</title>
      </Head>

      <div className={styles.container}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
