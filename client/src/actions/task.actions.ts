"use server";

import { ITaskDetails, ITask } from "@/interfaces";
import { getToken } from "@/lib/authHelper";
import { customFetch } from "@/lib/axiosInstance";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getUserTaskListAction = async (category?: string) => {
  const token = getToken();
  try {
    if (category) {
      const { data } = await customFetch.get(`/tasks?category=${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } else {
      const { data } = await customFetch.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    }
  } catch (error: any) {
    console.error("Error fetching user task list:", error);
    throw new Error("Something went wrong");
  }
};

export const getUserAction = async () => {
  const token = getToken();
  try {
    const { data } = await customFetch.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    throw new Error("Something went wrong");
  }
};

export const getUserSingleTaskAction = async ({
  id,
}: {
  id: string | null;
}): Promise<ITaskDetails> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  try {
    const { data } = await customFetch.get(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const createTaskAction = async ({
  title,
  description,
  category,
  completed,
}: {
  title: string;
  description?: string | undefined;
  category: string;
  completed: boolean;
}): Promise<void> => {
  const token = getToken();
  const data = { title, description, category, completed };
  try {
    await customFetch.post("/tasks", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/");
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const deleteTaskAction = async ({
  id,
}: {
  id: string;
}): Promise<void> => {
  const token = getToken();
  await customFetch.delete(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  revalidatePath("/");
};

export const updateTaskAction = async ({
  id,
  title,
  description,
  category,
  completed,
}: ITask): Promise<void> => {
  const token = getToken();
  const data = { title, description, category, completed };
  try {
    await customFetch.patch(`/tasks/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/");
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
