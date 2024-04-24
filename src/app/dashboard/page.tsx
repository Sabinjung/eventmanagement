
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
// import styles from "./index.module.css";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  return (
    <main >
      <div>
        Yoo
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
