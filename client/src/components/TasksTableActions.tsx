import EditTaskForm from './EditTaskForm';
import { ITask } from '@/interfaces';
import DeleteTaskButton from './DeleteTaskButton';

const TodosTableActions = ({ task }: { task: ITask }) => {
  return (
    <>
      <EditTaskForm task={task} />
      <DeleteTaskButton id={task.id} />
    </>
  );
};

export default TodosTableActions;
