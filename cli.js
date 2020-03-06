#!/usr/bin/env node

const argv = require('yargs')
    .usage('Usage: $0 : Library that finds links in your markdown file')
    .options({
      path:	{
        alias: 'p',
        description: 'File path.',
        requiresArg: true,
              required: true
          },
        validate:	{
            alias: 'v',
            description: 'Verify the status of each link on the file.',
            default: false,
            requiresArg: false,
            required: false
        },
        stats: {
            alias:'s',
            description:'Prints the number of found, unique and broken links',
            default: false,
            requiresArg: false,
            required: false
        }
    })

    .argv;

const path = require('path');
const chalk = require('chalk');
const { readFilePlease } = require('./scripts/readsfile.js');
const { validateLinks } = require('./scripts/validate.js');
const { statsLinks } = require('./scripts/statistics.js');

/** ******* Regular expression ****/
const regex = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!]))/gm);
/** ******* Main function *********/
const mdLinks = (args) => {
  if (path.extname(args.path) === '.md') {    
    readFilePlease(args.path)
      .then(data => {                             
        const linksInFile = data.match(regex),
          linksLength = linksInFile.length;
        // console.log(linksInFile);
        let linksArray = [];            
        if (linksLength) {
          linksInFile.forEach((element) => {                          
            let linkObject = {
              path: args.p,
              href: element 
            };
            linksArray.push(linkObject);
          });                      
           if (args.validate === false && args.stats === false) {
            console.log(chalk.magentaBright('This are the links in your .md file:'));
            console.log(linksArray); 
          } else if (args.validate === true & args.stats === true) {
            validateLinks(linksArray), statsLinks(linksArray);                 
          } else if (args.validate === true) {
            console.log('This is the status of your links:');
            validateLinks(linksArray);                            
          } else if (args.stats === true) {
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




mdLinks(argv);


