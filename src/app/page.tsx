
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import styles from "./index.module.css";
import { signIn } from "next-auth/react";
import { LoginButton } from "./_components/login-button";

export default async function Home() {
  const session = await getServerAuthSession();
  console.log(session)

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Event <span className={styles.pinkSpan}>Management</span> App
        </h1>
        {/* <div className={styles.cardRow}>
          <Link
            className={styles.card}
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className={styles.cardTitle}>First Steps →</h3>
            <div className={styles.cardText}>
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className={styles.card}
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className={styles.cardTitle}>Documentation →</h3>
            <div className={styles.cardText}>
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div> */}
        <div className={styles.showcaseContainer}>
          <p className={styles.showcaseText}>
           Login now to manage your Events.
          </p>

          <div className={styles.authContainer}>
            <LoginButton/>
          </div>
        </div>
        {/* <CrudShowcase /> */}
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest();

//   return (
//     <div className={styles.showcaseContainer}>
//       {latestPost ? (
//         <p className={styles.showcaseText}>
//           Your most recent post: {latestPost.name}
//         </p>
//       ) : (
//         <p className={styles.showcaseText}>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
