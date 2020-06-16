var exec = require("child_process").exec;

let execPromise = (cmd) => {
  return new Promise(function (resolve, reject) {
    exec(cmd, function (err, stdout) {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
};

let commands = [
  "git checkout --orphan gh-pages",
  "npm run build",
  "git --work-tree build add --all",
  "git --work-tree build commit -m 'Deploy'",
  "git push origin HEAD:gh-pages --force",
  "rm -r build",
  "git checkout -f master",
  "git branch -D gh-pages",
];

commands
  .reduce(async (p, cmd) => {
    const results = await p;
    const stdout = await execPromise(cmd);
    results.push(stdout);
    return results;
  }, Promise.resolve([]))
  .then(
    (results) => {
      console.log(results, "Successfully deployed");
    },
    (err) => {
      console.log(err, "Failed!!!");
    }
  );
