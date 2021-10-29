const express = require("express");
const {
  handleErrors,
  checkActionId,
  validateAction,
} = require("./actions-middlware");
const Actions = require("./actions-model");
const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});
router.get("/:id", checkActionId, (req, res) => {
  res.status(200).json(req.action);
});
router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

router.use(handleErrors);

module.exports = router;
