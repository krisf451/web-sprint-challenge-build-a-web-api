const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");
const yup = require("yup");

function handleErrors(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    prodMessage: "Something went wrong with the request",
  });
}

function checkActionId(req, res, next) {
  Actions.get(req.params.id)
    .then((possibleAction) => {
      if (possibleAction) {
        req.action = possibleAction;
        next();
      } else {
        next({ status: 404, message: "id not found" });
      }
    })
    .catch(next);
}

async function validateAction(req, res, next) {
  try {
    const validProjectId = await Projects.get(req.body.project_id);
    if (validProjectId) {
      const validated = await actionSchema.validate(req.body, {
        strict: false,
        stripUnknown: true,
      });
      req.body = validated;
      next();
    } else {
      next({
        status: 400,
        message: "provide a valid project id",
      });
    }
  } catch (error) {
    next({ status: 400, message: error.message });
  }
}

const actionSchema = yup.object().shape({
  project_id: yup
    .number()
    .typeError("project_id must be a number")
    .required("You must supply a valid project id")
    .integer(),
  description: yup
    .string()
    .typeError("description must be a string")
    .trim("whitespace aloen does not count")
    .required("description is required")
    .min(1, "description cannot be blank")
    .max(128, "description can be max 128 characters long"),
  notes: yup
    .string()
    .typeError("notes must be a string")
    .trim("whitespace aloen does not count")
    .required("notes is required"),
  completed: yup.boolean().default(false),
});

module.exports = {
  handleErrors,
  validateAction,
  checkActionId,
};
