import { DataSource } from "typeorm";
import { Users } from "./entities/users.entity";

export const UsersRepository = (dataSource: DataSource) => {
    return dataSource.getRepository(Users)
}