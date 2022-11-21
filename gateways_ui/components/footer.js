// import styles from '../styles/Home.module.css';
import Image from 'next/image';

const Footer = () => {
  const yearNow = new Date().getFullYear();
  return (
    <>
      {' '}
      <footer className="text-center mt-5">
        <p> Powered by An2 Gateway-Control {yearNow}</p>
      </footer>
    </>
  );
};

export default Footer;
