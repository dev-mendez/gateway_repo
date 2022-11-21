import Navbar from './navbar';
import Footer from './footer';
import Head from 'next/head';
import Script from 'next/script';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Gateway app" />
        <link rel="icon" href="/favicon.ico" />
        <meta charset="utf-8"></meta>
        <title>Gateway app</title>
      </Head>
      <div>
        <Navbar />
        <main>{children}</main>
        <Footer />

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js"
          integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk"
          crossorigin="anonymous"
        ></Script>
      </div>
    </>
  );
}
