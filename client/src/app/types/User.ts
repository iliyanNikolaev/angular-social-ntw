import { PopulatedComment } from "./PopulatedComment"
import { PopulatedUser } from "./PopulatedUser"

export type User = {
    _id: string,
    firstName: string,
    lastName: string,
    profilePic: string,
    posts: PopulatedPost[],
    connections: PopulatedUser[]
}

type PopulatedPost = {
    _id: string,
    textContent: string,
    picture: string,
    likes: PopulatedUser[],
    comments: PopulatedComment[],
    owner: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}