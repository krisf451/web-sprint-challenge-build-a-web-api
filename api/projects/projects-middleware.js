const Projects = require("./projects-model");
const yup = require("yup");

function checkProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then((possibleProject) => {
      if (possibleProject) {
        req.project = possibleProject;
        next();
      } else {
        next({ status: 404, message: "id not found" });
      }
    })
    .catch(next);
}

async function validateProject(req, res, next) {
  try {
    const validated = await projectSchema.validate(req.body, {
      strict: false,
      stripUnknown: true,
    });
    req.body = validated;
    next();
  } catch (error) {
    next({ status: 400, message: error.message });
  }
}

const projectSchema = yup.object().shape({
  name: yup
    .string()
    .typeError("name must be a string")
    .trim("whitespace aloen does not count")
    .required("notes is required"),
  description: yup
    .string()
    .typeError("description must be a string")
    .trim("whitespace aloen does not count")
    .required("description is required"),
});

module.exports = {
  validateProject,
  checkProjectId,
};
