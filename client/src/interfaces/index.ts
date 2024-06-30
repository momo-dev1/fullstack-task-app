import { ReactNode } from "react";

export interface ITask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
}

export interface ITaskDetails extends ITask {
  createdAt: ReactNode;
}
