
# wot-project-presentation-LuceriPalma

Project Road Condition Monitoring System based on Nordic Thingy:52


The complete project is composed by:
- FrontEnd (https://github.com/UniSalento-IDALab-IoTCourse-2021-2022/wot-project-FrontEnd-LuceriPalma)
- BackEnd (https://github.com/UniSalento-IDALab-IoTCourse-2021-2022/wot-project-BackEnd-LuceriPalma)
- presentation (https://github.com/UniSalento-IDALab-IoTCourse-2021-2022/wot-project-presentation-LuceriPalma)



## Authors

- [@mluceri ](https://www.github.com/mluceri)
- [@cpalma-usal](https://www.github.com/cpalma-usal)


## Installation and instruction

In the development environment, a local machine was utilized, with the following needed services:
- A web server (http-server, live-server, ‘express’ in node app, or apache web server) working on localhost. An express web server is included in the node application serverApp.js.
- A database (JSON Server, MongoDB, PostgreSQL), working on localhost. This project mainly uses json-server, a little development database (DB) server, with live reload capability to create a quick REST API for a DB stored on file in .json format (db.json file). The json-server is included in the node application serverApp.js
- A node application serverApp.js with extra functionalities such as web socket, routing control, access control, and more. ServerApp.js works on port 3002 on localhost.

In the production environment more configuration and settings are required:
- a private certificate for secure (https) connection, 
- a domain (or a dynamic domain with duckdns.org or similar services)

This repository contains the presentation of the project

Live demo at: https://iot-t52.duckdns.org:3002/iot/