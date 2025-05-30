import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto)
  }

  @Get()
  findAllTasks(): Promise<Task[]> {
    return this.taskService.findAllTasks()
  }

  @Get(':id')
  findTaskById(@Param('id') id: string): Promise<Task | null> {
    return this.taskService.findTaskById(id)
  }

  @Patch(':id/update')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task>{
    return this.taskService.updateTask(id,updateTaskDto)
  }

  @Delete(':id/delete')
  deleteTask(@Param('id') id:string): Promise<Task>{
    return this.taskService.deleteTask(id)
  }
}
