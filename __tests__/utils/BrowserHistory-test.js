var base_path = '../../';
var path = base_path + 'utils/BrowserHistory';

jest.dontMock(path);


describe('BrowserHistory.getHash', function() {
    it('returns empty string when running server side and no url has been set', function() {
        var BrowserHistory = require(path);
        var expected = '';
        var result = BrowserHistory.getHash();

        expect(result).toBe(expected);
    });

    it('returns the supplied hash when running server side and a url has been set', function() {
        var BrowserHistory = require(path);
        BrowserHistory.setUrl('/#Feed/campaigns');

        var expected = 'Feed/campaigns';
        var result = BrowserHistory.getHash();

        expect(result).toBe(expected);
    });
});

describe('BrowserHistory.getQueryString', function() {

    it('returns only the url query string', function() {
        var BrowserHistory = require(path);
        BrowserHistory.setUrl('/#Feed/campaigns?brand=Toyota');

        var expected = 'brand=Toyota';
        var result = BrowserHistory.getQueryString();

        expect(result).toBe(expected);
    });
});