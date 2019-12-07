const util = require('util');
const { exists, mkdir, mkdirSync } = require('fs');
const { join } = require('path');

const targetDirectory = '/mnt/c/workarea';
const newDir = join(targetDirectory,'hello','Simple', 'jjj');

function checkifExists(directory) {
    return new Promise(async (resolve,reject)=> {
        const exist = await util.promisify(exists)(directory);
        resolve(exist);
    });    
}

const x = async ()=>  {
    const x = await checkifExists(targetDirectory);
    !x && await util.promisify(mkdir)(newDir, { recursive: true});
    return await checkifExists(newDir);
};

x().then(y=> {
    console.log(y);
}).catch(er=> {
    console.error(er);
});
