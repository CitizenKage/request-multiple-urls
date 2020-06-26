const urlTool = require('./index');

describe('parseUrl', () => {
    it('can detect an invalid url', () => {
        expect(urlTool.isUrlValid('skdjfhslkdjfryh')).toEqual(false);
        expect(urlTool.isUrlValid('http://ft')).toEqual(false);
        expect(urlTool.isUrlValid('https://ft')).toEqual(false);
        expect(urlTool.isUrlValid('http://www.ft')).toEqual(false);
        expect(urlTool.isUrlValid('https://www.ft')).toEqual(false);
    });

    it('can detect a valid url', () => {
        expect(urlTool.isUrlValid('http://ft.com')).toEqual(true);
        expect(urlTool.isUrlValid('https://ft.com')).toEqual(true);
        expect(urlTool.isUrlValid('http://www.ft.com')).toEqual(true);
        expect(urlTool.isUrlValid('https://www.ft.com')).toEqual(true);
    });
});

describe('requestMultipleUrls', () => {
    it('can fetch from valid urls', async () => {
        const urls = ['https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
            'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
            'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
        ];
        const results = await urlTool.requestMultipleUrls(urls);
        expect(results.filter(result => result instanceof Error)).toEqual([]);
    });

    it('throws an exception from invalid urls', async () => {
        expect.assertions(1);
        const urls = ['www.test123.meh',
            'http://www.test456.meh',
            'https://www.test789.meh'
        ];
        try {
            await urlTool.requestMultipleUrls(urls);
        } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
        }
    });
});