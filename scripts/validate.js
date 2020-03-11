const chalk = require('chalk');
const fetch = require('node-fetch');
module.exports.validateLinks = (linksArray) => {    
  let promises = linksArray.map(async (element) => {  
    let result = {}; 
    try {
      result = await fetch(element.href);
    } catch (error) {
     console.log(`Error: ${error.message}`);      
    }   
    return result;
    
  });
   Promise.all(promises)
    .then((data) => {
      const validLinks = [];
      const brokenLinks = [];
      for(let i=0; i < data.length; i++){
        //console.log(data[i].url); // acceder al arreglo de links(promesas)  
        if(data[i].status >= 200 && data[i].status < 300){
          let validLink = ['✔', data[i].url, data[i].status, data[i].statusText ];
          validLinks.push(validLink)          
        }else{
          let brokenLink = ['X', data[i].url, data[i].status, data[i].statusText ];
          brokenLinks.push(brokenLink)
        }   
    } 
    console.log(validLinks);
    console.log(chalk.redBright(`${brokenLinks}`));
    })
    .catch((error) => {
      console.log(`Error ${error}`);      
    });
};


/**
 * .then(response => {        
        if (response.status >= 200 && response.status < 300) {
          let validLinks = chalk.green('[✔]') + chalk.cyan(element.href) 
                  + chalk.bgGreen(` ${response.status} ${response.statusText} `) 
                  + '\n' + chalk.yellowBright(element.path);
          console.log(validLinks);  
        } else {
          let brokenLinks = chalk.red('[X]') + chalk.cyan(element.href) 
                  + chalk.bgRed(` ${response.status} ${response.statusText} `) 
                  + '\n' + chalk.whiteBright(element.path);
          console.log(brokenLinks);                      
        } 
      }).catch((error) => console.log(chalk.gray('[-]'), chalk.cyan(element.href), 
        chalk.bgRed(` ${error.type} ${error.code} `), chalk.whiteBright(element.path)));
 */