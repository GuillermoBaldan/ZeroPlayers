const simulationParameters = require('../Setting Enviroment Test/simulationParameters');

test('timeperStep equal to 100', () => {
  expect(simulationParameters.timePerStep).toBe(100);
});