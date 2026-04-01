const { hash } = require('bcryptjs')

exports.doHash = (value, sortValue) => {
    const result = hash(value, sortValue)
    return result;
}