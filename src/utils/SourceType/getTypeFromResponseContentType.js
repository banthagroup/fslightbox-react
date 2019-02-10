export const getTypeFromResponseContentType = (contentType) => {
    return contentType.slice(0, contentType.indexOf('/'));
};