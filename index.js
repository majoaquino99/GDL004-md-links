const path = require('path');
const fs = require('fs');
const process = require('process');
const chalk = require('chalk');
const https = require('https');
const fetch = require('node-fetch');
let fileText = '';


/******************** 1. Recibiendo parametros *****************/
const route = process.argv[2];
const options = process.argv/* .slice(3, process.argv.length) */;
const validateParameter = options.includes('--validate') || options.includes('--v');
const statsParameter = options.includes('--stats') || options.includes('--s');


/******************** 2.Revisando que la ruta sea un archivo *************/

/******************** 
3.Revisando que el archivo sea un archivo .md 
4.Leyendo archivo, convirtiendo de buffer a utf-8
5.Encontrando links con RegEx, guardando en array
6.Obtener length de array de links
*********************/
const routeIsMd = path.extname(route) === '.md',// 3
readFile = fs.readFileSync(route, 'utf-8'), //4
regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))/g,
linksInFile = readFile.match(regex), //5
linksLength = linksInFile.length; //6

let links = [];
  links.push({
    href: linksInFile,
    path: route,
    text: 'Text'
  });

console.log(links);

const validateLinks = () => {  
  linksInFile.map((element) => {    
		fetch(element)
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
          let validLinks = chalk.green('[✔]') + chalk.cyan(element) + chalk.bgGreen(` ${response.status} ${response.statusText} `);
          console.log(validLinks);        
				} else {
          let brokenLinks = chalk.red('[X]') + chalk.cyan(element) + chalk.bgRed(` ${response.status} ${response.statusText} `);
          console.log(brokenLinks);          
				}
			}).catch((error) => console.log(chalk.gray('[-]'), chalk.cyan(element), chalk.bgRed(` ${error.type} ${error.code} `)));
	})
}

const mdLinks = () => {
  if(routeIsMd){ // Es archivo .md?
    fileText = readFile; 
    if(linksLength !== 0){ // if(linksLength) Hay links?
      if(validateParameter == false && statsParameter == false){ //validate & stats = false
      console.log('This are the links in your .md file: \n ', chalk.cyan(linksInFile));      
      }else if (validateParameter == true && statsParameter == true){ // validate & stats = true
        console.log('Total: Broken: Unique:');
        }else if(validateParameter == true){ // validate = true
            console.log('This are the status of your links: \n ');
            validateLinks(); //await promise.all()     
          }else if(statsParameter == true){ // validate = false
            console.log(`You have ${linksLength} links in your .md file`); 
          }        
  }else{
    console.log('Your file has no links.');    
  } 
  }else{
    console.log('Your file is not an .md file'); 
 }
}

mdLinks();

/* 
const mdPath = process.argv[2];

const mdValidation = () => { //validating existance of .md file
  let mdExtension = path.extname(mdPath);
  if (mdExtension == '.md'){
    readMD(mdPath)    
    }
    else{
     console.log ('Ivalid file extension or path.')
    }
}
 */
/* const readMD = mdPath => {  
  let syncReadFile = fs.readFileSync(mdPath, 'utf-8');   
  const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))/g;
  const foundLinks = syncReadFile.match(regex);
  if(foundLinks === null){
    console.log('No links found');    
  }else{
    console.log('This are the links in your .md file: \n ', foundLinks); 
  }  
/*   const linksLength = foundLinks.length;
  console.log(`You have ${linksLength} links in your .md file`);   


mdValidation(); */

/* 
const markdownLinkExtractor = require('markdown-link-extractor');
let linksMD = markdownLinkExtractor(syncReadFile);
linksMD.forEach(function (linksMD) {
  
  let arrayLinks = {
    linkPath: mdPath,
    linkURL: linksMD,
    linkStatus:'The Link is'      
};

console.log(arrayLinks); */



/* fs.readFile('./README2.md', (error, data) => {
    if (error){ 
    console.log(`Error ${error}`);
    }else{
      console.log(data);      
    }
  }); 

let syncData = fs.readFileSync('./README.md', 'utf-8');
console.log(syncData);
 */
/* const validLinks = [];
  const brokenLinks =[];  
  for (let i = 0; i < linksInFile.length; i++) {       
    fetchUrl(linksInFile[i], function(error, meta, body){
      if (meta.status == 200) {
        validLinks.push(linksInFile[i]);
      } else {
        brokenLinks.push(linksInFile[i]);
      }
    }); 
  }
  setTimeout(()=>{
    console.log(validLinks);
    console.log(brokenLinks);
  }, 6000);
   */
