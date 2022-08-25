function multiple(simulationParameters) {
  let flag = true; //wideDimension es múltiplo de squareSide
  if (
    simulationParameters.wideDimension % simulationParameters.squareSide !==
    0
  ) {
    flag = false;
  }
  return flag;
}

export { multiple };
