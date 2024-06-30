import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ITask } from '@/interfaces';
import TasksTableActions from './TasksTableActions';
import Link from 'next/link';

export default function TasksTable({ tasks }: { tasks: ITask[] }) {
  return (
    <Table className="border">
      <TableCaption>A list of your tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks?.map((task) => (
          <TableRow key={task?.id}>
            <TableCell className={task.completed ? 'line-through' : ''}>
              <Link
                href={`/dashboard/tasks/${task.id}`}
                className="cursor-pointer"
              >
                {task?.title}
              </Link>
            </TableCell>

            <TableCell className="capitalize">{task.category}</TableCell>
            <TableCell className="flex items-center justify-end space-x-2">
              <TasksTableActions task={task} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total Tasks</TableCell>
          <TableCell className="text-right pr-5">
            {tasks.length && tasks.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
