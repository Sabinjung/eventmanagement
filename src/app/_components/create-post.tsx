"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
import styles from "../index.module.css";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  const updateEvent = api.event.update.useMutation();

  const createEvent = api.event.create.useMutation();

  const deleteEvent = api.event.delete.useMutation();

  const holidays = api.holiday.getHolidays.useQuery({timezone:"America/New_York"});
  console.log(holidays.data)

  const {data} = api.event.getAll.useQuery();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // createPost.mutate({ name });
        // updateEvent.mutate({
        //   id: 1,
        //   title: "Raila garne din",
        //   endTime: new Date(),
        // })
        createEvent.mutate({
          title: "fuck",
          description: "fucking asshole",
          startTime: new Date("2024-09-23T02:21:00.000Z"),
          endTime: new Date("2024-09-23T03:03:00.000Z"),
          participants: "everyone"
        })
      }}
      className={styles.form}
    >
      <input 
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
