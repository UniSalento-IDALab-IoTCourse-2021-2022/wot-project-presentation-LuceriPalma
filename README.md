
# wot-project-BackEnd-LuceriPalma

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
- A web server (http-server, live-server, ‘express’ in node app, or apache web server) working on port 8080 on localhost. This project mainly uses live-server, a little development server with live reload capability.
- A database (JSON Server, MongoDB, PostgreSQL), working on port 3000 on localhost. This project mainly uses json-server, a little development database (DB) server, with live reload capability to create a quick REST API for a DB stored on file in .json format (db.json file).
- A node application serverApp.js with extra functionalities such as web socket, routing control, access control, launch the trained model and more. ServerApp.js works on port 3002 on localhost.


This repository contains the backend : a json-server file, the model environment, and the node serverApp.js


### Setting and launch of the json-server 

Assuming node and npm installed.

```bash
  cd json-server
  cp db.vuoto.json db.json 
  npm i -g json-server
  json-server db.json
```

The server will be listening on :
  http://localhost:3000


### Setting of the virtualenv python3 for the model

Assuming python3, pip and virtualenv installed.
Setting of the virtual environment for the model with python3 venv. Assuming installend virtualenv of python3

```bash
  cd model
  virtualenv venv 
  source ./venv/bin/activate
  pip install requirements.txt
```

tested with 
- Python 3.9.12
- pip 22.3.1 




### Launch the node serverApp.js with node.
Assuming node and npm installed.

```bash
  cd node
  npm i 
  node serverApp.js
```

The json-server will be listening on :
  http://localhost:3002

tested with 
- node version v18.12.0
- npm version 8.19.2



### Other requirements 
Other requirements for the project are:
- curl (https://curl.se/)
- jq  (https://stedolan.github.io/jq/)


## Acknowledgements
 - [Nordic Thingy js library](https://github.com/NordicPlayground/Nordic-Thingy52-Thingyjs)
 - [Leaflet interactive map](https://leafletjs.com/)
 - [json-server](https://github.com/typicode/json-server/)


### Launch the web server with the code from the FrontEnd repository
The FrontEnd part is available on the [FrontEnd repository](https://github.com/UniSalento-IDALab-IoTCourse-2021-2022/wot-project-FrontEnd-LuceriPalma)