var base_path = '../../';
var path = base_path + 'utils/UrlStore';

jest.dontMock(path);

describe('UrlStore.getQueryParams', function() {
    var UrlStore = require(path);

    it('uses', function() {
        var expected = {};
        var result = UrlStore.getQueryParams();

        expect(result).toEqual(expected);
    });
});
