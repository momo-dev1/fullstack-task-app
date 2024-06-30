import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtGuard } from 'src/auth/guard';
import { CreateTaskDto, EditTaskDto } from './dto';
import { GetUser } from '../auth/decorator';

@Controller('tasks')
@UseGuards(JwtGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(
    @GetUser('id') userId: string,
    @Query('category') category?: string,
  ) {
    return this.tasksService.getAllTasks(userId, category);
  }

  @Get(':id')
  getSingleTask(@GetUser('id') userId: string, @Param('id') taskId: string) {
    return this.tasksService.getSingleTask(userId, taskId);
  }

  @Post()
  createTask(
    @GetUser('id') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(userId, createTaskDto);
  }

  @Patch(':id')
  editTask(
    @GetUser('id') userId: string,
    @Param('id') taskId: string,
    @Body() editTaskDto: EditTaskDto,
  ) {
    return this.tasksService.editTask(userId, taskId, editTaskDto);
  }

  @Delete(':id')
  deleteTask(@GetUser('id') userId: string, @Param('id') taskId: string) {
    return this.tasksService.deleteTask(userId, taskId);
  }
}
