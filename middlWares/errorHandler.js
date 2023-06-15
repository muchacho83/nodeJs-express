const { constants } = require("../constants");

const errHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({ title:"Not validated",message: err.message, stackTrace: err.stackTrace });
    case constants.UNAUTHORIZED:
        res.json({ title:"Unauthorized",message: err.message, stackTrace: err.stackTrace });
    case constants.NOT_FOUND:
        res.json({ title:"Not Found",message: err.message, stackTrace: err.stackTrace });

    }
};

module.exports = errHandler;
