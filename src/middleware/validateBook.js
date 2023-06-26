const validateBook = (schema) => {
const func = (req, res, next) => {
console.log(req.body);
const { error } = schema.validate(req.body);
console.log(error);
if (error) throw new Error("Error");
next();
};
return func;
};

module.exports = { validateBook };
