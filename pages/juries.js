import Head from "next/head";
import { TopBar } from "../components/TopBar";
import styles from "../styles/Home.module.css";

export default function Juries() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Grading System</title>
        <meta
          name="description"
          content="this is an app to manage final year project grades"
        />
      </Head>

      <TopBar />
    </div>
  );
}