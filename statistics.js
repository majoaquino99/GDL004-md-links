const chalk = require('chalk');
const fetch = require('node-fetch');
module.exports.statsLinks = (links) => {   
  let validLinks = 0;
  let brokenLinks = 0;
  for (let i = 0; i < links.length; i++) {
    fetch(links[i])
      .then((response) => {            
        if (response.status >= 200 && response.status < 300) {
          validLinks++ ;             
        } else {
          brokenLinks++ ;
        }
      }).then(() => {
        if (validLinks + brokenLinks === links.length) {
          console.log(` ${chalk.bgGreen('✔ Total :')}   ${links.length}\n ✔ Unique : ${validLinks}\n ${chalk.redBright('✖ Broken')} : ${brokenLinks}`);                
        }
      }).catch(error => console.log(error.type, error.code));
  }   
};