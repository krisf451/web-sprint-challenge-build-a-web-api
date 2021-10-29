const express = require("express");
const { handleErrors } = require("../actions/actions-middlware");
const Projects = require("./projects-model");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Project Router is Working");
});

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
});
router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
});
router.post("/", (req, res) => {});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});
router.get("/:id/actions", (req, res) => {});

router.use(handleErrors);

module.exports = router;
