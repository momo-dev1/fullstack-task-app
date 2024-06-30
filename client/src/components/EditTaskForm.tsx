'use client';

import { updateTaskAction } from '@/actions/task.actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { taskFormSchema, TaskFormValues } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { useState, useEffect, useMemo } from 'react';
import Spinner from './Spinner';
import { ITask } from '@/interfaces';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { categories } from '@/lib/data';
import toast from 'react-hot-toast';

const EditTaskForm = ({ task }: { task: ITask }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultValues: Partial<TaskFormValues> = useMemo(() => {
    return {
      title: task.title,
      description: task.description as string,
      category: task.category as string,
      completed: task.completed,
    };
  }, [task]);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [task, form, defaultValues]);

  const onSubmit = async (data: TaskFormValues) => {
    setLoading(true);
    await updateTaskAction({
      id: task.id,
      title: data.title,
      description: data.description as string,
      category: data.category as string,
      completed: data.completed,
    });
    toast.success('Task updated successfully');
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="ml-auto">
        <Button>
          <Pen size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit this Task</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a short description about your next task"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can write a short description about your next task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a task category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category: any) => (
                          <SelectItem
                            className="capitalize"
                            key={category || ''}
                            value={category || ''}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can select a category for your next task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Completed</FormLabel>
                    </div>
                    <FormDescription>
                      Your task item will be uncompleted by default unless you
                      checked it.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner /> Saving
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskForm;
