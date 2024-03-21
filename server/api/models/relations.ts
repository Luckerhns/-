import { Group } from "./Group";
import { Calendar } from "./Calendar";
import { Student } from "./Student";
import Token from "./Token";

Group.hasMany(Student, { foreignKey: "groupId" });
Student.belongsTo(Group, { foreignKey: "groupId" });

Student.hasMany(Token);
Token.belongsTo(Student);

Group.hasOne(Calendar);
Calendar.belongsTo(Group);

export { Group, Student };
