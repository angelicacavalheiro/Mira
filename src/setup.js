import dotenv from 'dotenv';

let envFile =  '.env.test';

//prod, dev, test são os nomes que os bancos tem

if(process.env.NODE_ENV === "prod"){
  envFile = '.env'
}

if(process.env.NODE_ENV === "dev"){
  envFile = '.env.dev'
}

console.log('ENV' + envFile)

dotenv.config({
  path: envFile
});