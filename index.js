const fs = require("fs");
const crypto = require("crypto");
const axios = require("axios");

const urlData = "https://coderbyte.com/api/challenges/json/age-counting";

(async () => {
  const { data } = await axios.get(urlData);

  let countAge = 0;
  let outputWithKeys = [];
  const splitData = data.data.split(", ");
  const keyIndex = [];
  const agesIndex = [];
  const outputFileName = "output.txt";

  // splitData.forEach((item, index))

  splitData.forEach((item, index) => {
    // if(i % 2 === 0) { // even

    if (item.indexOf("age") > -1) {
      const getAge = item.replace("age=", "");
      if (getAge === "32") {
        countAge = countAge + 1;
        agesIndex.push(index);
      }
    }

    if (item.indexOf("key") > -1) {
      keyIndex.push(index);
    }
  });

  agesIndex.forEach((item, index) => {
    const keyValue = splitData[item - 1].replace("key=", "");
    outputWithKeys.push(keyValue);

    if (index === agesIndex.length - 1) outputWithKeys.push("\n");
  });

  const hash = crypto
    .createHash("sha1")
    .update("FSF34FSDFDS34", "binary")
    .digest("hex");

  let writerStream = fs
    .createWriteStream("output.txt")
    .on("finish", function () {
      //   console.log("Write Finished.");
    })
    .on("error", function (err) {
      //   console.log(err.stack);
    });

  writerStream.write(outputWithKeys.join("\n"), function () {
    // Now the data has been written.
    console.log("Write completed.");
  });

  // Mark the end of file
  writerStream.end();

  console.log(hash);
})();
