const  simulationParameters = require('../Setting Enviroment Test/simulationParameters');
const init = require('../Setting Enviroment Test/init');
const stageParameters = require('../Setting Enviroment Test/stageParameters');

test('Checking simulation parameters data consistent', () => {
  expect(init(stageParameters,simulationParameters)).toBe("The data is not consistent");
});