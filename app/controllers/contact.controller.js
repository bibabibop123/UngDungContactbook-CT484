const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "name can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (err) {
        console.log('err',err);
        return next(
            new ApiError(500, 'an error occurred while creating the contact')
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (err) {
        return next(
            new ApiError(500, "an error occurred")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "contact not found"));
        }
        return res.send(document);
    } catch (err) {
        console.log(err)
        return next(
            new ApiError(500, 'error retrieving contact with id =${req.params.id}')
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "contact not founf")); 
        }
        return res.send({ message: "contact was updated successfully"});
    } catch (err) {
        return next(
            new ApiError(500, 'error updating contact with id=${req.params.id}')
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "contact not founf")); 
        }
        return res.send({ message: "contact was deleted successfully"});
    } catch (err) {
        return next(
            new ApiError(500, 'could not delete contact with id=${req.params.id}')
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll();
        return res.send({ message: "${deleteCount} contacts deleted successfully"});
    } catch (err) {
        return next(
            new ApiError(500, 'can error occurred while retrieving favorite contact')
        );
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        return res.send(document);
    } catch (err) {
        return next(
            new ApiError(500, 'an error occurred while retrieving favorite contact')
        );
    }
};