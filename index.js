var fetch = require("node-fetch");

const isUrlValid = (url) => {
    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    return url.match(new RegExp(expression)) !== null;
}

const requestMultipleUrls = async (urls) => {
    const allPromises = urls.map(url => {
        if (!isUrlValid(url)) {
            throw new TypeError(`"${url}" is not a valid url, Urls must be in the format http(s)://myUrl.suffix`);
        }
        return fetch(url);
    });

    return await Promise.all(allPromises.map(async promise => {
        const response = await promise;
        if (response.ok) {
            return response.json();
        }
        return response;
    }));
}

module.exports.isUrlValid = isUrlValid;
module.exports.requestMultipleUrls = requestMultipleUrls;