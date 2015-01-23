var base_path = '../../';
var path = base_path + 'utils/UrlStore';

jest.dontMock(path);
jest.mock(base_path + 'utils/BrowserHistory');


describe('UrlStore.getQueryParams', function() {
    var BrowserHistory = require(base_path + 'utils/BrowserHistory');
    var UrlStore = require(path);

    it('returns empty object when no query parameters exist', function() {
        BrowserHistory.getQueryString.mockReturnValue('');

        var expected = '{}';
        var result = UrlStore.getQueryParams();

        expect(JSON.stringify(result)).toBe(expected);
    });

    it('returns an object with parameters', function() {
        BrowserHistory.getQueryString.mockReturnValue('brand=Toyota&product=Corolla');

        var expected = {
            brand: 'Toyota',
            product: 'Corolla'
        };

        var result = UrlStore.getQueryParams();

        expect(result).toEqual(expected);
    });

    it('converts true/false strings to boolean', function() {
        BrowserHistory.getQueryString.mockReturnValue('fieldA=true&fieldB=false');

        var expected = {
            fieldA: true,
            fieldB: false
        };

        var result = UrlStore.getQueryParams();

        expect(result).toEqual(expected);
    });

    it('correctly decodes the url strings', function() {
        var txt = "There's Care... $ And % :) There's Mercy! Care";
        BrowserHistory.getQueryString.mockReturnValue('fieldA=' + encodeURIComponent(txt));

        var expected = {
            fieldA: txt
        };

        var result = UrlStore.getQueryParams();

        expect(result).toEqual(expected);
    });
});


describe('UrlStore.paramsToQueryString', function() {
    var UrlStore = require(path);

    it('converts an object to a query string', function() {
        var params = { brand: 'Toyota', product: 'Corolla' };
        var expected = 'brand=Toyota&product=Corolla';
        var result = UrlStore.paramsToQueryString(params);

        expect(result).toBe(expected);
    });

    it('return empty string for blank object', function() {
        var params = {};
        var expected = '';
        var result = UrlStore.paramsToQueryString(params);

        expect(result).toBe(expected);
    });

    it('encodes the values', function() {
        var params = { brand: 'National Australia Bank'};
        var expected = 'brand=National%20Australia%20Bank';
        var result = UrlStore.paramsToQueryString(params);

        expect(result).toBe(expected);
    });

    it('sorts the parameters', function() {
        var params = {
            zzz: '3rd',
            aaa: '1st',
            fff: '2nd'
        };
        var expected = 'aaa=1st&fff=2nd&zzz=3rd';
        var result = UrlStore.paramsToQueryString(params);

        expect(result).toBe(expected);
    });
});

describe('UrlStore.setQueryParams', function() {
    var BrowserHistory = require(base_path + 'utils/BrowserHistory');
    var UrlStore = require(path);

    it('does not attempt to change url when no parameters are passed in', function() {
        var expected = false;
        var result = UrlStore.setQueryParams();

        expect(result).toBe(expected);
    });

    it('attempts to update the url', function() {
        BrowserHistory.getHash.mockReturnValue('Feed/campaigns');
        BrowserHistory.getQueryString.mockReturnValue('');

        var params = {
            brand: 'Toyota'
        };

        var expected = {
            path: '#Feed/campaigns?brand=Toyota',
            options: {
                replace: false,
                trigger: true
            }
        };
        var result = UrlStore.setQueryParams(params);

        expect(result).toBe(true);
        expect(BrowserHistory.navigate).toBeCalledWith(expected.path, expected.options);
    });

    it('merges parameters with existing query string', function() {
        BrowserHistory.getHash.mockReturnValue('Feed/campaigns');
        BrowserHistory.getQueryString.mockReturnValue('industry=Automotive');

        var params = {
            brand: 'Toyota'
        };

        var expected = {
            path: '#Feed/campaigns?brand=Toyota&industry=Automotive',
            options: {
                replace: false,
                trigger: true
            }
        };
        var result = UrlStore.setQueryParams(params);

        expect(result).toBe(true);
        expect(BrowserHistory.navigate).toBeCalledWith(expected.path, expected.options);
    });

    it('respects options', function() {
        BrowserHistory.getHash.mockReturnValue('Feed/campaigns');
        BrowserHistory.getQueryString.mockReturnValue('industry=Automotive');

        var params = {
            brand: 'Toyota'
        };

        var expected = {
            path: '#Feed/campaigns?brand=Toyota&industry=Automotive',
            options: {replace: true, trigger: true}
        };
        var result = UrlStore.setQueryParams(params, {addHistoryEvent: false});

        expect(result).toBe(true);
        expect(BrowserHistory.navigate).toBeCalledWith(expected.path, expected.options);
    });

    it('does not attempt to change url when query string is the same', function() {
        BrowserHistory.getHash.mockReturnValue('Feed/campaigns');
        BrowserHistory.getQueryString.mockReturnValue('brand=Toyota');

        var params = {
            brand: 'Toyota'
        };

        var expected = {
            path: '#Feed/campaigns?brand=Toyota',
            options: {replace: true, trigger: true}
        };
        var result = UrlStore.setQueryParams(params, {addHistoryEvent: false});

        expect(result).toBe(false);
        expect(BrowserHistory.navigate).not.toBeCalledWith(expected.path);
    });
});

describe('UrlStore.getRouteBase', function() {
    var BrowserHistory = require(base_path + 'utils/BrowserHistory');
    var UrlStore = require(path);

    it('returns returns the first hash segemnt', function() {
        BrowserHistory.getHash.mockReturnValue('#Feed/campaigns');
        BrowserHistory.getQueryString.mockReturnValue('brand=Toyota');

        var expected = '#Feed';
        var result = UrlStore.getRouteBase();

        expect(result).toBe(expected);
    });
});







