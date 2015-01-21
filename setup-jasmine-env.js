var outputPath = 'test-output/',
	consolidateAll = true,
	consolidate = true;

var jr = require('jest-reporters');

var junit = new jr.JUnitReporter(outputPath, consolidateAll, consolidate);

jasmine.getEnv().addReporter(junit);