const chalk = require('chalk');
const fetch = require('node-fetch');
module.exports.statsLinks = (links) => {   
  let validLinks = 0;
  let brokenLinks = 0;
  let promises = links.map(async (element) => {
    let result = {};
    try {
      result =  await fetch(element)      
    } catch (error) {
      console.log(error.message);      
    }
    return result

  })
  Promise.all(promises)
  .then((response) => { 
    for(let i = 0; i < response.length; i++){
      if (response[i].status >= 200 && response[i].status < 300) {
        validLinks++ ;             
      } else {
        brokenLinks++ ;
        
      } if (validLinks + brokenLinks === links.length) {
        console.log(` ${chalk.bgGreen('✔ Total :')}   ${links.length}\n ✔ Unique : ${validLinks}\n ${chalk.redBright('✖ Broken')} : ${brokenLinks}`);                
      }
    }               
  }).catch(error => console.log(error.type, error.code));
};