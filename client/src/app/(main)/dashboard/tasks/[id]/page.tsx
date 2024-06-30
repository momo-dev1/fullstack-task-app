import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TasksTableActions from "@/components/TasksTableActions";
import { Badge } from "@/components/ui/badge";
import Wrapper from "@/components/Wrapper";
import { getUserSingleTaskAction } from "@/actions/task.actions";

interface IProps {
  params: {
    id: string;
  };
}
const TaskDetails = async ({ params: { id } }: IProps) => {
  const task = await getUserSingleTaskAction({ id });

  if (!task) return <Wrapper>No Tasks Found</Wrapper>;

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <div className="mb-3 flex justify-between">
            {task.completed}
            <Badge variant="secondary">
              {task.completed ? "Completed" : "UnCompleted"}
            </Badge>
          </div>
          <CardTitle className={task.completed ? "line-through" : ""}>
            {task.title}
          </CardTitle>
          <CardDescription>
            <p>Created: {task.createdAt}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <div>{task.description}</div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <div className="flex  gap-2">
              <TasksTableActions task={task} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </Wrapper>
  );
};

export default TaskDetails;
