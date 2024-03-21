import ErrorException from "../../errors/ErrorException";
import { Student } from "../../models/Student";

export default class ActivateService {
    public static async activate(link) {
        const user = await Student.findOne({where: {activationLink: link}})
        if(!user) throw ErrorException.BadRequest('Incorrect activation link')

        await user.update({isActivated: true})
    }
}