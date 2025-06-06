const jsonfile = require("jsonfile");

const moment = require("moment");
const simpleGit = require("simple-git");

const random = require("random");
const FILE_PATH = "./data.json";

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const DATE = moment()
    .subtract(0.5, "y")
    .add(21, "d")
    .add(x, "w")
    .add(y, "d")
    .format();
  const data = {
    date: DATE,
  };
  console.log(DATE);
  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE, "--author": "Vien Vuong <vienvuong@pm.me>" }, makeCommit.bind(this, --n))
      .push();
  });
};

makeCommit(30);
