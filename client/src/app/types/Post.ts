import { PopulatedComment } from "./PopulatedComment"
import { PopulatedUser } from "./PopulatedUser"

export type Post = {
    _id: string,
    textContent: string,
    picture: string,
    likes: PopulatedUser[],
    comments: PopulatedComment[],
    owner: PopulatedUser,
    createdAt: string,
    updatedAt: string,
    __v: number
}