import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {
  // update a module
  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;

    await modulesDao.updateModule(moduleId, moduleUpdates);
    res.sendStatus(204);
  });

  // delete a module
  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await modulesDao.deleteModule(moduleId);
    res.send(status);
  });
}