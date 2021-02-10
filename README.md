## Flight Management

The flight management project is an application made in Javascript / Cypress, where there are validation scenarios for reservations and flight itineraries.

### Prerequisites

The requirement for this project is to have [Node.js](https://nodejs.org/en/)

### Installation

```shell
npm install
```

### Start Cypress

```shell
npm run open
```

## Tests

| Type | Location                                 |
| ---- | ---------------------------------------- |
| ui  | [cypress/integration/flight-management/E2E](./cypress/integration/flight-managament/E2E) |

## Additional NPM Scripts

| Script         | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
| headless       | Starts the test cases in headless browser mode                         |
| create_reports | Generates the creation of the execution report headless in html file   |
| headless-repeat| Run test cases n times in headless-mode with the cypress-repeat plugin |

For a complete list of scripts see [package.json](./package.json)

## Execution examples

1. To run in open mode, just run

```shell
npm run open
```

2. To run in headless mode and generate report

```shell
npm run headless
npm run create_reports
```

> 🚩 **Note** 
> 
>The report will be generated in ./cypress/reports/html/index.html

3. To run the scripts n times

```shell
npm run headless-repeat "absolute path"
```

**e.g** 

```shell
npm run headless-repeat "/home/user/Workspace/flight-management/cypress/integration/flight-management/E2E/Test.js"
```
## Best practices

When defining a test on a web page, it was decided to make use of the Cypress automation tool since it is a tool specially designed for the definition of automated test cases at the E2E level, with this automation framework the readability of the code is allowed In a simple way, the possibility of using the testing-library as a library on which we can base ourselves to search for elements in an easier way such as the searches that are made with the 'findbyText', 'findByRole', easier to read and To maintain the code, cypress allows the possibility and the request sniffer is implemented with the page, being able to obtain those elements at certain times and perform API mockings or in the case of the project, to be able to make implicit waits to validate the loading of the elements at the level of UI with the 'cy.intercept', it is possible to add design pattern themes making use of assertions with BDD with chai, where we have the possibility to It is possible to make assertions depending on the elements that are or are not in the DOM 'should (“be.visible”)', or certain actions that are allowed to be done in the platform, additionally it would be possible to implement a level beyond BDD and it is adding pickle and cucumber to allow scalability of projects, code reuse, among others. Additionally, the possibility of generating reports with the mochawesome-report dependencies was implemented.
