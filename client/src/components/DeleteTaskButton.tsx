'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import Spinner from './Spinner';
import { deleteTaskAction } from '@/actions/task.actions';
import toast from 'react-hot-toast';

const DeleteTaskButton = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      size={'icon'}
      variant={'destructive'}
      onClick={async () => {
        setLoading(true);
        await deleteTaskAction({ id });
        toast.success('Task deleted');
        setLoading(false);
      }}
    >
      {loading ? <Spinner /> : <Trash size={16} />}
    </Button>
  );
};

export default DeleteTaskButton;
