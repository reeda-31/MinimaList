import cron from "node-cron";
import { Todo } from "../models/Todo.model.js";
import { User } from "../models/User.model.js";
import { sendEmail } from "../lib/sendEmail.js";

export const startReminderCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running reminder cron...");

    const now = new Date();
    const startOfDay = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    );
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    try {
      const todos = await Todo.find({
        reminderSent: false,
        dueDate: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }).populate("user");

      for (const todo of todos) {
        const user = todo.user;

        await sendEmail(
          user.email,
          "Todo Reminder ⏰",
          `Reminder: "${todo.title}" is due today!`,
        );

        todo.reminderSent = true;
        await todo.save();
      }
    } catch (error) {
      console.error("Cron error:", error);
    }
  });
};
