import { Group } from "./Group";
import { Student } from "./Student";

Group.hasMany(Student, { foreignKey: "groupId" });
Student.belongsTo(Group, { foreignKey: "groupId" });

export { Group, Student };
