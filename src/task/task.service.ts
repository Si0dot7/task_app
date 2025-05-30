
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) { }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { title, description } = createTaskDto
      const task = this.taskRepository.create({ title, description })
      return await this.taskRepository.save(task)
    } catch (error) {
      throw new ConflictException({
        message: [`can't not save`]
      })
    }
  }

  async findAllTasks(): Promise<Task[]> {
    try {
      return this.taskRepository.find()
    } catch (error) {
      throw new NotFoundException({
        message: ['task not found']
      })
    }
  }

  async findTaskById(id: string): Promise<Task | null> {
    try {
      return await this.taskRepository.findOne({ where: { id: id } })
    } catch (error) {
      throw new NotFoundException({
        message: ['task not found by id']
      })
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const task = await this.findTaskById(id)

      if (!task) {
        throw new NotFoundException({
          message: ['task not found by id']
        })
      }

      const { title, description } = updateTaskDto

      if (title) {
        task.title = title
      }
      if (description) {
        task.description = description
      }

      return await this.taskRepository.save(task)

    } catch (error) {
      throw new NotFoundException({
        message: ['task not found by id update']
      })
    }

  }

  async deleteTask(id: string): Promise<Task> {
    try {
      const task = await this.findTaskById(id);
      if (!task) {
        throw new NotFoundException({
          message: ['task not found by id for delete']
        });
      }
      await this.taskRepository.delete(id);
      return task;
    } catch (error) {
      throw new NotFoundException({
        message: ['task not found by id for delete']
      });
    }
  }

}
