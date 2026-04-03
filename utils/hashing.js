const { createHmac } = require('crypto')

const { hash, compare } = require('bcryptjs');

exports.doHash = (value, saltValue) => {
    return hash(value, saltValue);
};

exports.doHashValidation = (value, hashedValue) => {
    return compare(value, hashedValue);
};

exports.hmacProcess = (value, key) => {
    const result = createHmac('sha256', key).update(value).digest('hex')
    return result;
}