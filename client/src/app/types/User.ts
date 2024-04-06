import { PopulatedUser } from "./PopulatedUser"
import { Post } from "./Post"

export type User = {
    email: string,
    _id: string,
    firstName: string,
    lastName: string,
    profilePic: string,
    posts: Post[],
    connections: PopulatedUser[]
}
