/*eslint-disable */
//
// Maths Functions
// 
// The name might be a bit close to JS's Math.whatever
// Feel free to think of a better one.
// 

var Maths = {
    extent: function (data) {
        return [Math.min.apply(null, data), Math.max.apply(null, data)];
    },
    normalize: function (rawValue, min, max) {
        // return 100 - Math.round((ammount / max) * 100);
        return (rawValue - min) / (max - min);
    },
    tickRange: function (ticks, min, max) {
        // Actual range of graph.
        var segment = max - min;

        // each tick is a proption of the segment. Must remove one as we are really 
        // calculating the gaps between the ticks.
        // var tickSpace = segment / (ticks - 1);

        if (!ticks || ticks === 0) {
            throw new Error('Stampy.Maths.tickRange() - ticks must be > 0');
        }

        var tickSpace = segment / ticks;

        // return a range from base to the max at steps of the tickSpace.
        // Must add 1 becuase the last tick's height is really a zero value
        return this.range(min, max + tickSpace, tickSpace).reverse();
    },
    range: function(start, end, step) {
        // from lodash 3.10.1
        start = +start || 0;
        step = step == null ? 1 : (+step || 0);
        if (end == null) {
            end = start;
            start = 0;
        } else {
            end = +end || 0;
        }
        var index = -1,
            length = Math.max(Math.ceil((end - start) / (step || 1)), 0),
            result = Array(length);
        while (++index < length) {
            result[index] = start;
            start += step;
        }
        return result;
    },
    autoDecimalPlaces: function (value, fixed, cutoff) {
        cutoff = cutoff || 0.1;
        value = Number(value);
        return (value < cutoff) ? value : value.toFixed(fixed);
    },
    toDecimal: function (a, b) {
        return b * a / 100;
    },
    toPercentage: function (a, b) {
        return 100 * a / b;
    },
    cycle: function (length, index) {
        return (length + index) % length;
    }
};

module.exports = Maths;