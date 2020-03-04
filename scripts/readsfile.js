const fs = require('fs'); // acceder al sistema de archivos de nuestra computadora
module.exports.readFilePlease = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf-8', (error, content) => {
      if (error) return reject(`Error ${error}`);
      resolve(content);
      // console.log(data);                            
    }); 
  });
}; 