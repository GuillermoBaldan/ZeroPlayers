let files2clean = [
    "ZeroPlayers_f_arraysManipulation.js",
    "ZeroPlayers_f_canvas.js",
    "ZeroPlayers_f_checkValues.js",
    "ZeroPlayers_f_dataCoherence.js",
    "ZeroPlayers_f_level1.js",
    "ZeroPlayers_f_livingbeings.js",
    "ZeroPlayers_f_math.js",
    "ZeroPlayers_f_matrixGeneration.js",
    "ZeroPlayers_f_movement.js",
    "ZeroPlayers_f_simulation.js",
    "ZeroPlayers_f_universe.js",
    "ZeroPlayers_f_GUI.js",
    "ZeroPlayers_f_staticStageGeneration.js",
    "ZeroPlayers_f_checkValues.js",
    "ZeroPlayers_f_pathfinder.js",
      ];
  
  let file;
  let fs = require("fs");
  //1. Open and read the file ZeroPlayers_classes_livingBeings.js
  files2clean.forEach(function (item) {
    file = fs.readFileSync(`./frontend/${item}`, "utf8");
    //2. Remove the debug functions, using a regex, the expressions start with 'debug_' and ends with ')'
    file = file.replace(/console.log\("{0,1}`{0,1}[A-Za-zÁÉÍÓÚáéíóúñÑ 0-9-.:;\$\{\}]+"{0,1}`{0,1}\)/g, "");
    //3. Write the file
    fs.writeFileSync(`./frontend/${item}`, file);
  });
  