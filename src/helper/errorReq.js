const messages = {
400: "Bad Request",
401: "Unathorized",
409: "Conflict",
};

const ErrorHandling = (status, message = messages[status]) => {
const error = new Error(message);
error.status = status;
return error;
};

module.exports = { ErrorHandling };
