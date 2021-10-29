const express = require("express");
const { handleErrors } = require("../actions/actions-middlware");
const { checkProjectId, validateProject } = require("./projects-middleware");
const Projects = require("./projects-model");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Project Router is Working");
});

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get("/:id", checkProjectId, (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

router.put("/:id", validateProject, checkProjectId, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch(next);
});

router.delete("/:id", checkProjectId, async (req, res, next) => {
  try {
    Projects.remove(req.params.id).then(() => {
      next();
    });
  } catch (error) {
    next(error);
  }
});
router.get("/:id/actions", checkProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((projectActions) => {
      res.status(200).json(projectActions);
    })
    .catch(next);
});

router.use(handleErrors);

module.exports = router;
