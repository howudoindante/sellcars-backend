const path = require( 'path' );
const  { fileURLToPath }= require('url');
const  swaggerAutogen = require('swagger-autogen');

const outputFile = path.join(process.cwd(), '/swagger/output.json');
const endpointsFiles = [path.join(process.cwd(), 'engine.js')];
const doc = {
    // общая информация
    info: {
        title: 'Sellcars backend',
        description: 'Backend routes'
    },
    host: 'localhost:5000',
    schemes: ['http']
}
swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(
    ({ success }) => {
        console.log(`Generated: ${success}`);
    }
);
