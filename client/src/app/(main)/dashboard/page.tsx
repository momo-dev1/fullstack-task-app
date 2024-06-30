import { getUserTaskListAction } from "@/actions/task.actions";
import Wrapper from "@/components/Wrapper";
import TasksTable from "@/components/TaskTable";
import AddTaskForm from "@/components/AddTaskForm";
import SelectCategory from "@/components/SelectCategory";

interface IProps {
  searchParams?: { [key: string]: string | undefined };
}
const Dashboard = async ({ searchParams }: IProps) => {
  let tasks;

  if (searchParams?.category) {
    tasks = await getUserTaskListAction(searchParams?.category);
  } else {
    tasks = await getUserTaskListAction();
  }

  if (!tasks) return <Wrapper>No Tasks Found</Wrapper>;

  return (
    <Wrapper>
      <div className="flex">
        <SelectCategory />
        <AddTaskForm />
      </div>

      <TasksTable tasks={tasks} />
    </Wrapper>
  );
};
export default Dashboard;
