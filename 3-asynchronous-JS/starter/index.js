const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject ('I am not find the file :(');
            resolve(data);
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if(err) reject('Data nai malto 😂');
            resolve('success');
        })
    })
}


const readDogFile = async () => {
    try{

        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
    
        const res1 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);   
        const res3 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);   
        const all = await Promise.all([res1, res2, res3]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('save this file');
    
    }   catch (err){
        console.log(err);

        throw err;
    }

    return('2: Readyyyyy!🐶')
};


(async() => {
    try{
        console.log('1: Will get dog pic')
        const x = await readDogFile();
        console.log(x);
        console.log('3: you getting the pic')
    } catch(err){
        console.log ('Error 🤦')
    }
})()










// console.log('1: Will get dog pic')
// readDogFile().then (x=> {
//     console.log(x);
//     console.log('3: you getting the pic')
// })
// .catch(err => {
//     console.log ('Error 🤦')
// });



/*
readFilePro(`${__dirname}/dog.txt`)
.then(data => {
    console.log (`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
})
.then(res => {
    console.log(res.body.message)
    return writeFilePro('dog-img.txt', res.body.message);
})
.then(() => { 
    console.log('save this file');
})
.catch(err => {
    console.log(err.message);
})
*/