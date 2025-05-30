import { DataSource } from "typeorm";
import { Task } from "./entities/task.entity";

export const TaskRepository = (dataSource: DataSource) =>{
    return dataSource.getRepository(Task);
}