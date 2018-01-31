const chai = require('chai');
const chaiHttp = require('chai-http');
require('../app/index');

const expect = chai.expect;
let url = 'http://localhost:8000';

chai.use(chaiHttp);
