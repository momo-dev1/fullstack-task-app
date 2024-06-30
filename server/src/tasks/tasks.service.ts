import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, EditTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  getAllTasks(userId: string, category?: string) {
    return this.prisma.task.findMany({
      where: {
        userId,
        ...(category && { category }),
      },
    });
  }

  getSingleTask(userId: string, taskId: string) {
    return this.prisma.task.findUnique({
      where: {
        id: taskId,
        userId,
      },
    });
  }

  async createTask(userId: string, createTaskDto: CreateTaskDto) {
    const bookmark = await this.prisma.task.create({
      data: {
        userId,
        ...createTaskDto,
      },
    });

    return bookmark;
  }

  async editTask(userId: string, taskId: string, editTaskDto: EditTaskDto) {
    return this.prisma.task.update({
      where: {
        id: taskId,
        userId,
      },
      data: {
        ...editTaskDto,
      },
    });
  }

  async deleteTask(userId: string, taskId: string) {
    await this.prisma.task.delete({
      where: {
        id: taskId,
        userId,
      },
    });
  }
}
