// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./Develop/utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
      {  
        //   project title is entered first and is required - shown as ${data.title} in generateMarkdown file
        type: 'input',
        name: 'title',
        message: 'Hello! Please enter your project name. (Required)', 
        validate: projectTitle => {
            if (projectTitle) {
                return true;
            } else {
                console.log("Please enter the title to your project!");
                return false;
            }
            }
        },

    {
        // description of project is entered and is required - shown as ${data.description} in generateMarkdown file
        type: 'input',
        name: 'description',
        message: 'Now, can you please a provide a description of your project? (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log("Please enter a description for your project!");
                return false;
            }
        }
    },
        // table of contents is implemented already, presents data of added information and takes you to link with respective content - does not require data attachment (see generateMarkdown js file)
    {
        // installation of project - how would you install this project? description is required. ${data.installation} in generateMarkdown file
        type: 'input',
        name: 'installation',
        message: 'How would you install your project? (Required)',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log("Please enter the instructions on how you would install your project.");
                return false;
            }
        }
    },
    {
        // usage of project - basically, how do you use the project you created? Required input - ${data.usage} in generateMarkdown file 
        type: 'input',
        name: 'usage',
        message: 'How do you use your project? (Required)',
        validate: usageInput => {
            if (usageInput) {
                return true; 
            } else {
                console.log("Please enter the instructions on how you use the project.");
                return false; 
            }
        }
    },
    {
        //contributions - how would you want contributors on this project? Required input - ${data.contributions} on generateMarkdown file
        type: 'input',
        name: 'contributions',
        message: 'List how you would want others to contribute on this project. (Required)',
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log("Please enter the instructions on how you would want contributions on this project.");
                return false;
            }
        }
    },
    {
        //testing - how would you test your project? Required input - ${data.test} on generateMarkdown file
        type: 'input',
        name: 'test',
        message: 'How do you test your project? (Required)',
        validate: testInput => {
            if (testInput){
                return true;
            } else {
                console.log("Please enter the instructions on how you would test your project.");
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'license',
        message: 'What license fits with your project? (Required)',
        choices: ['Apache','APM','MIT','Mozilla-public','GitHub','NPM','REUSE Compliance'],
        validate: licenseSelection => {
            if (licenseSelection){
                return true;
            } else {
                console.log("Please choose a license for your project!");
                return false;
            }
        }
    }



])
}
   

// should generate the following (from readme guide) - take to markdown file but keep for question prompt reference - also in notes app

// tests/instruction example of project (REQUIRED) ${data.test}
// addition of license (REQUIRED) ${data.license}
        // badges for license to visually display (in generatemarkdown js)
//questions - added github username links to your github account and  added email address allowing those to contact you (REQUIRED)
//email ${data.email} 
//github ${data.github}")



// TODO: Create a function to write README file 
const writeToFile = (data) => {
    fs.writeFile('./dist/README.md', data, err => {
        if (err) 
            throw err;
           console.log("README file has been created!");
});
}

// TODO: Create a function to initialize app - put as a promise chain functionality
questions()
.then(data => {console.log('Done!'); return data})
    .then(data => {return generateMarkdown(data)})
        .then(writeReadme => {
            return writeToFile(writeReadme);
        })
        .catch(error => {console.log(error + "An error has popped up!")
    })