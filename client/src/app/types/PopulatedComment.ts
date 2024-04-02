import { PopulatedUser } from "./PopulatedUser"

export type PopulatedComment = {
    _id: string,
    textContent: string,
    owner: PopulatedUser
}
