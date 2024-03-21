export default class GroupStudentService {
  static async getAllUsersByGroup(body) {
    try {
      const users = await Student.findAll(body.group);
      if (!users) {
        throw new ModelException(404, "This group doenst exist");
      }
      if (!users) {
        throw new ModelException(404, "Users not found");
      }
    } catch (error) {
      throw new ErrorException(
        403,
        `Error while getting users group : ${error}`
      );
    }
  }
}
