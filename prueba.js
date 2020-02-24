const path = require('path');
const fs = require('fs');
const userPath = (process.argv[2]);
const fetch = require('node-fetch');
let expectLink = /https?:\S+\w/g;
let allLinks;
let statusLinks;
let ok = 0;
let bad = 0;


const checkMd = (filePath) => (path.extname(filePath) === '.md');

const readFileMd = () => {
  fs.readFile(userPath, 'utf8', (err, data) => {
    if (err);
    
  });
  return true;
};
readFileMd();

const findLinksMd = () => {
  fs.readFile(userPath, 'utf8', (err, data) => {
    allLinks = data.match(expectLink);
    console.log(allLinks);
  });
  return true
};
findLinksMd();

const validateLinks = () => {
  fs.readFile(userPath, 'utf8', (err, data) => {
    statusLinks = data.match(expectLink);
    for (let i = 0; i < statusLinks.length; i++) {
      fetch(statusLinks[i]).then((response) => {
        if (response.status === 200 || response.status !== 200) console.log(` File: ${userPath}\n Link: ${statusLinks[i]}\n Response code: ${response.status}\n `);
        return response
      }).catch((error) => {
        console.log('There was a problem with the Fetch request:' + error.message)
      })
    }
  });
};
validateLinks();

const statsLinks = () => {
  fs.readFile(userPath, 'utf8', (err, data) => {
    statusLinks = data.match(expectLink);
    for (let i = 0; i < statusLinks.length; i++) {
      fetch(statusLinks[i]).then((response) => {
        if (response.status === 200) ok++;
        return response
      }).then((response) => {
        if (response.status !== 200) bad++;
        return response
      }).then(() => {
        if (ok + bad === statusLinks.length) console.log(` ✔ Total : ${statusLinks.length}\n ✔ Unique : ${ok}\n ✖ Broken : ${bad}`);
      })
    }
  });
};
statsLinks();
module.exports = {
  checkMd,
  readFileMd,
  findLinksMd,
  validateLinks,
  statsLinks
};