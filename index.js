// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require('fs');
const generateMarkdown = require("./utils/generateMarkdown.js");
const { reject } = require("lodash");
const { resolve } = require("path/posix");

// TODO: Create an array of questions for user input
const questions = [ {
    type: "input",
    name: "title",
    message: "What is your project title?"
},
{
    type: "input",
    name: "description",
    message: "Enter a description of your project:"
},
{
    type: "input",
    name: "instructions",
    message: "Enter installation instructions"
},
{
    type: "input",
    name: "usage",
    message: "Enter usage information",
},
{
    type: "input",
    name: "guidelines",
    message: "Enter contribution guidelines",
},
{
    type: "input",
    name: "test",
    message: "Enter test instructions",
},
{
    type: "checkbox",
    name: "licesnses",
    message: "Choose a license",
    choices: [
        "MIT",
        "Mozilla",
        "Eclipse",
        "Apache"
    ]
},
{
    type: "input",
    name: "name",
    message: "Enter your GitHub username"
},
{
    type: "input",
    name: "email",
    message: "Enter your email address"
}
];

// const promptUser = () => {
//     return inquirer.prompt([
//         {
//             type: "input",
//             name: "title",
//             message: "What is your project title?",
//         }
//     ])
// }

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, err => {
            if (err) {
                reject(err);
                return;
            }
    
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
    
};

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
    .then((answers) => {
        // console.log(answers.title);
        // console.log(generateMarkdown(answers));
        return writeToFile('./dist/README.md', generateMarkdown(answers));
    }).then(writeFileResponse => {
        console.log(writeFileResponse);
    })
    .catch(err => {
        console.log(err);
    });