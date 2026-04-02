const { hash } = require('bcryptjs')

exports.doHash = (value, sortValue) => {
    const result = hash(value, sortValue)
    return result;
}

exports.doHashValidation = (value, hashedValue) => {
    const result = hash(value, hashedValue)
    return result;
}