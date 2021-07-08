const fs = require("fs");

const renameFiles = () => {
  fs.readdir("./1", (err, files) => {
    files.forEach((file, i) => {
      let newName = file.slice(2);
      fs.rename("./1" + "/" + file, "./2" + "/" + newName, (err) => {
        if (err) throw err;
        console.log("rename completed!");
      });
    });
  });
};

renameFiles();
