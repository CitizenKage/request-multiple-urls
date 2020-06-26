# request-multiple-urls

Usage - The function takes an array of valid absolute urls, this means that the protocol will have to be included in the url. This will return an array of responses.

e.g. const results = request-multiple-urls(['http://www.testsite.com', 'http://www.testsite2.com']);

Normally I would use the ES6 module format for importing/exporting but I have used the older require format due to brevity and removing the requirements of babel configuration for Jest