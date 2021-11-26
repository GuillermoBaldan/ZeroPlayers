function debug_PrintDynamicsElementsCoordinates(Array) {
  Array.forEach((element) => {
    console.log(`(${element.x},${element.y})`);
  });
}

export { debug_PrintDynamicsElementsCoordinates };
