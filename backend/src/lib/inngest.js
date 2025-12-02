import { Inngest } from "inngest";
import { connectDB } from "./db-config.js";
import User from "../model/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "Edu-IQ" });

const syncUser = inngest.createFunction(
  { id: "sync-user-with-db" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = new User({
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    });

    await newUser.save();
  }
);

const deleteUserFromDatabase = inngest.createFunction(
  { id: "delete_user_from_db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.findOneAndDelete({ clerkId: id });
  }
);

export const functions = [syncUser, deleteUserFromDatabase];
