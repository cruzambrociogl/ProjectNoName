# ProjectNoName
## Project IS and Cloud Computing

### Commands to clone and build the container
###### -- In your desired folder 
>`git clone https://github.com/cruzambrociogl/ProjectNoName.git`

>`cd ProjectNoName`

###### -- open it in your preferred code editor

#### -Install docker

### Build the project
###### --replace your local IP address in app/docker-compose.yaml [line 16]

#### build and run the project
>`docker-compose up --build`

#### just run the container
>`docker-compose up`

### Running the 
###### --Open the bash of the container
>`docker exec -it <id> sh`

>`npm start` inside the container bash