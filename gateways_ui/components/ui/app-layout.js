import Head from 'next/head';
import Footer from './layout-components/footer';
import styles from '../../styles/Home.module.css';
import Navbar from './layout-components/navbar';
import { SnackbarProvider } from 'notistack';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Gateway Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SnackbarProvider maxSnack={3}>
        <main className={styles.main}>{children}</main>
      </SnackbarProvider>
      <Footer />
    </>
  );
}
