import { Group } from "../api/models/Group";
import { User } from "../api/models/User";

Group.hasMany(User)
User.belongsTo(Group)

export { Group, User };