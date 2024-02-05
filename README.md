# Automation warehouse framework 

## Install
in order to have it funtional run the install command
```sh
npm ci
```

## Run tests
To run the tests you must be in the root folder and write the following command, where the chrome could be changed for any other browser like firefox.
Testcafe will pick every tests that exists inside the tests folder and run it in a sandbox with the given browser

```sh
npx testcafe chrome tests/
```
we can set a browser headless execution as follows: 
```sh
npx testcafe chrome:headless tests/
```
### Run it Locally
To run these tests locally we must set some values such as URL, User/email Password and Database.
### 1st option
create environment variables 

| Variable      | value |
| ------        | ------ |
| TEST_URL      | http://localhost:4200/ |
| TEST_USR      | LDAP@corp.com |
| TEST_PSS      | XXXXXX |
| TEST_DB       | db_name |
| TEST_CLIENT_V | v.XXXXXX |
| TEST_API_V    | v.XXXXXX |

### 2nd option
pass as parameters these values in json format inside the fixture:
```sh
fixture(`local tests`)
    .beforeEach(async t=>{
       await Init.Load({url:'http://localhost:4200/', credentials:{user: 'LDAP@corp.com', password: "XXXXX", database:"db_name"}});
    })
```
> Note: `this option can also be used if a specific scenario requires a specific user `

## Run Options
| command | description |
| ------ | ------ |
| --test-meta | TestCafe runs tests whose metadata matches the specified key-value pair. See -meta options|
| --fixture-meta | TestCafe runs tests whose fixture’s metadata matches the specified key-value pair. See -meta options |

| -meta options | description |
| ------ | ------ |
| testType | options: smoke, regression, e2e, pythonRF, API |
| UITest | true or false, this will run the tests that are testing the UI or not like the API or some cases of python RF |
| testGoal | the value of this option is the area the its being tested: Login, API, PythonRF,etc |

## Command example 
> Note: `npx testcafe chrome tests/ --test-meta testType=smoke,UITest=true`
