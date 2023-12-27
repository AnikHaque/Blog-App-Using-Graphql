import { User } from "@prisma/client";
import { prisma } from "..";
import DataLoader from "dataloader";

const batchUsers = async (ids: number[]): Promise<User[]> => {
    // ids: [10, 11, 12, 13]
    console.log(ids);
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: ids
            }
        }
    });

    console.log("users: ", users);

    
    const userData: { [key: string]: User } = {};

    users.forEach((user) => {
        userData[user.id] = user;
    });
    console.log(userData)

    return ids.map((id) => userData[id]);
};

//@ts-ignore
export const userLoader = new DataLoader<number, User>(batchUsers);