const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if(!req.body.name) {
        return next(new ApiError(400, "name can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(
            new ApiError(500, "an error occurred while creating")
        );
    }
};