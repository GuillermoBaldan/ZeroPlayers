const stageParameters = require('../Setting Enviroment Test/stageParameters');

test('timeperStep equal to 100', () => {
  expect(stageParameters.dynamicElementsArray[0].color).toBe("yellow");
});