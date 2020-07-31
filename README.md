# node-skeleton
![Alt text](./screenshot.jpg?raw=true "Node-Skeleton CLI screenshot")

NodeJS skeleton project. Contains basic packages and configuration for our ideal initial node skeleton. Just easily run node-skeleton cli

###Vision
CLI project for generation of basic & advances projects. 

###Our goal
Find advanced features, collect relevant npm packages into this package, configure features within this pacakge and finally wrap it into this CLI, so, you can easily generate new project.

###Features we support
- Typescript (yes, we believe in typescript for our basic projects)
- Typescript support for build and watch mode
- Swagger with OpenAPI Specification 3.0 already set
- Automatic swagger validations- Error 400 swagger validations enforcement through
- Set API via controller.ts files- configure new APIS by only adding new typescript function or create new typescript file (no hardcore .yml, .json updates are needed)
- Annotations support for OpenAPI within typescript
- Support of advanced dependency injection (DI) among all project including for controller
- Logging support enabling control multiple appenders and log levels 
- Eslint (all relevant settings are already in)
- Support Dockerfile supporting multi-stages low signature build
- docker-compose file for both build and running project  
 


###How to start
- Install node-skeleton package in **GLOBAL** mode via: "npm install -g @erez111/node-skeleton"
- Great! Now, go to folder in which you want to initiate new package and then execute: "node-skeleton generate --features all"
- cd [generated package] and then:
  - "npm install"
  - "npm run build" (Must use it at beginning and for each time routing is changes)
  - "npm start" (run without watch) or "npm run dev" (run with watch. Please notice that you must keep running "docker run build" for each time routing changes for it to take effect) 
- Project is ready, now you can enter swagger (swagger address appears at command line) 
- No need to manage a list of controllers files- to add new controller files, just add a folder contains "controller" file name.
  See example witin code.
- and, hope you like it, good luck!

###Personal
* If you find this package helpful, we appreciate your recommendation and starring it
* If you find any errors, or have any advices, you can either those it or email me
