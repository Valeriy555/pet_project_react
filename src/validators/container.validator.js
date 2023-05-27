import Joi from "joi";

const containerValidator = Joi.object({

    shipper: Joi.string().regex(new RegExp('^[[a-zA-ZА-яёЁіІїЇ ]{2,25}$')).required().messages({
        'string.empty': 'Помилка!!shipper не може бути пустим!!!',
        'string.pattern.base': 'Помилка!! В полі shipper тільки літери та пробіли, макс 25 символов'
    }),
    consignee: Joi.string().regex(new RegExp('^[[a-zA-ZА-яёЁіІїЇ ]{2,25}$')).required().messages({
        'string.empty': 'Помилка!!consignee не може бути пустим!!!',
        'string.pattern.base': 'Помилка!! В полі consignee тільки літери, макс 25 символов'
    }),
    forwarder: Joi.string().regex(new RegExp('^[[a-zA-ZА-яёЁіІїЇ ]{2,20}$')).required().messages({
        'string.empty': 'Помилка!!forwarder не може бути пустим!!!',
        'string.pattern.base': 'Помилка!! В полі forwarder тільки літери, макс 20 символов'
    }),
    goods: Joi.string().regex(new RegExp('^[[a-zA-ZА-яёЁіІїЇ ]{2,20}$')).required().messages({
        'string.empty': 'Помилка!!goods не може бути пустим!!!',
        'string.pattern.base': 'Помилка!! В полі goods тільки літери, макс 20 символов'
    }),
    container: Joi.string().regex(new RegExp('^[[a-zA-Z\\d]{11}$')).required().messages({
        'string.empty': 'Помилка!!container не може бути пустим!!!',
        'string.pattern.base': 'Помилка!! В полі container тільки літери, всього 11 символов'
    }),
    consignment: Joi.string().regex(new RegExp('^[[a-zA-Z\\d]{2,20}$')).required().messages({
        'string.empty': 'Помилка!!consignment не може бути пустим!!!',
        'string.pattern.base': 'Помилка!! В полі consignment тільки літери, макс 20 символов'
    }),
    stage: Joi.string().required().messages({
        'string.empty': 'Помилка!!stage не може бути пустим!!!',
    }),

});

export {
    containerValidator
}