const path = require('path');
const fs = require('fs');
const process = require('process');
const chalk = require('chalk');
const fetch = require('node-fetch');

/********** Options ***********/
const routeMD = process.argv[2],
options = process.argv,
validateParameter = options.includes('--validate') || options.includes('--v'),
statsParameter = options.includes('--stats') || options.includes('--s');

const parameters = {
    noParameter: validateParameter == false && statsParameter == false,
    validateAndStats: validateParameter == true && statsParameter == true,
    validate: validateParameter == true,
    stats: statsParameter == true
}
/********* Regular expression ****/
const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))/gm;
/********* Main function *********/
const mdLinks = (route, options) => {
    if(path.extname(route) === '.md'){
        const readFilePlease = (route) => {
            return new Promise((resolve, reject) => {
                fs.readFile(route, 'utf-8', (error, content) => {
                    if (error) return reject(`Error ${error}`);
                    resolve(content);
                    //console.log(data);                            
                }) 
            });
        } 
        readFilePlease(route)
        .then(data => {          
            const linksInFile = data.match(regex),
            linksLength = linksInFile.length;
            //console.log(linksInFile);
            let linksArray = [];            
                if(linksLength){
                    linksInFile.forEach((element) =>  {                          
                        let linkObject = {
                        path: route,
                        href: element,
                        text: 'Aquí iría el label de link'  
                        };
                            linksArray.push(linkObject)
                            return linksArray 
                        });             
                        if(options.validate == false && options.stats == false){
                            console.log(chalk.magentaBright('This are the links in your .md file:'));
                            console.group(linksArray); 
                            } else if (options.validate == true & options.stats == true){
                                console.log(validateLinks(linksArray), statsLinks(linksArray));                 
                                } else if (options.validate == true){
                                    console.log('This is the status of your links:');
                                    console.log(validateLinks(linksArray));                            
                                    } else if (options.stats == true){
                                        console.log(`You have ${linksLength} links in your .md file`); 
                                        console.log(statsLinks(linksInFile));
                                    }

                }else{
                    console.log('Your file has no links');                      
                }                              
        })
        .catch(error => console.log(error));                        
    }else{
        console.log('Your file is not a .md file.');
        
    }    
}


const validateLinks = (linksArray) => {  
    linksArray.map((element) => {      
            fetch(element.href)
              .then(response => {        
                if (response.status >= 200 && response.status < 300) {
                  let validLinks = chalk.green('[✔]') + chalk.cyan(element.href) 
                  + chalk.bgGreen(` ${response.status} ${response.statusText} `) 
                  + '\n' + chalk.yellowBright(element.path);
                  console.log(validLinks);    
                } else {
                  let brokenLinks = chalk.red('[X]') + chalk.cyan(element.href) 
                  + chalk.bgRed(` ${response.status} ${response.statusText} `) 
                  + '\n' +  chalk.whiteBright(element.path);
                  console.log(brokenLinks);                      
                } 
              }).catch((error) => console.log(chalk.gray('[-]'), chalk.cyan(element.href), 
              chalk.bgRed(` ${error.type} ${error.code} `), chalk.whiteBright(element.path)));
          })
}
const statsLinks = (links) => {   
        let validLinks = 0;
        let brokenLinks = 0;
        for (let i=0; i < links.length; i++){
            fetch(links[i])
            .then((response) => {            
                if(response.status >= 200 && response.status < 300 ) {
                validLinks++ ;             
            }else{
                brokenLinks++ ;
            }
            }).then(() => {
                if(validLinks + brokenLinks == links.length){
                    console.log(` ${chalk.bgGreen('✔ Total :')}   ${links.length}\n ✔ Unique : ${validLinks}\n ${chalk.redBright('✖ Broken')} : ${brokenLinks}`);                
                }
            }).catch(error => console.log(error.type, error.code));
        }   
}
mdLinks(routeMD, parameters)