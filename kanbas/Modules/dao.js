import model from "./model.js";

export async function findModulesForCourse(courseId) {
  const data = await model.find({ course: courseId }).populate("course");

  return data;
}
export function createModule(module) {
  delete module._id;
  return model.create(module);
}
export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
}
export function updateModule(moduleId, moduleUpdates) {
  return model.updateOne({ _id: moduleId }, moduleUpdates);
}
