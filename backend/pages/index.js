import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Application de Billetterie</title>
        <meta
          name="description"
          content="Application de billetterie générée par Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>
          Bienvenue dans l'application de billetterie
        </h1>
      </header>

      <main className={styles.main}>
        <p className={styles.description}>
          Commencez par éditer{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <section className={styles.grid}>
          <Link href="/events">
            <a className={styles.card}>
              <h2>Événements &rarr;</h2>
              <p>Explorez les événements disponibles</p>
            </a>
          </Link>

          <Link href="/tickets">
            <a className={styles.card}>
              <h2>Billets &rarr;</h2>
              <p>Gérez vos billets</p>
            </a>
          </Link>

          <Link href="/profile">
            <a className={styles.card}>
              <h2>Profil &rarr;</h2>
              <p>Gérez votre profil</p>
            </a>
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Propulsé par{" "}
          <img src="/vercel.svg" alt="Logo Vercel" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
