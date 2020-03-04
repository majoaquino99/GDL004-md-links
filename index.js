const path = require('path');
const process = require('process');
const chalk = require('chalk');
const { readFilePlease } = require('./scripts/readsfile.js');
const { validateLinks } = require('./scripts/validate.js');
const { statsLinks } = require('./scripts/statistics.js');

/** ******** Options ***********/
const routeMD = process.argv[2],
  options = process.argv,
  validateParameter = options.includes('--validate') || options.includes('-v'),
  statsParameter = options.includes('--stats') || options.includes('-s');

const parameters = {
  validate: validateParameter,
  stats: statsParameter
};
/** ******* Regular expression ****/
const regex = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!]))/gm);
/** ******* Main function *********/
const mdLinks = (route, options) => {
  if (path.extname(route) === '.md') {
    readFilePlease(route)
      .then(data => {                      
        const linksInFile = data.match(regex),
          linksLength = linksInFile.length;
        // console.log(linksInFile);
        let linksArray = [];            
        if (linksLength) {
          linksInFile.forEach((element) => {                          
            let linkObject = {
              path: route,
              href: element,
              text: 'Aquí iría el label de link'  
            };
            linksArray.push(linkObject);
          });            
          if (options.validate === false && options.stats === false) {
            console.log(chalk.magentaBright('This are the links in your .md file:'));
            console.log(linksArray); 
          } else if (options.validate === true & options.stats === true) {
            validateLinks(linksArray), statsLinks(linksArray);                 
          } else if (options.validate === true) {
            console.log('This is the status of your links:');
            validateLinks(linksArray);                            
          } else if (options.stats === true) {
            console.log(`You have ${linksLength} links in your .md file`); 
            statsLinks(linksInFile);
          }
        } else {
          console.log('Your file has no links');                      
        }                              
      })
      .catch(error => console.log(error));                        
  } else {
    console.log('Your file is not a .md file.');
  }    
};

mdLinks(routeMD, parameters);