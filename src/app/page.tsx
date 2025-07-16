import styles from "./page.module.css";
import Dashboard from "./dashboard/page";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/dashboard');

  return (
    <div className={styles.page}>
        <Dashboard/>
    </div>
  );
}
