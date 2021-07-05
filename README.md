This project is created in React.js and Asp.net Core 2.1

Developed by LappyPanda Dev Team
(Philip B. Radana - Project Manager
Jitro B. Dangoy - Frontend/Backend Developer
Harvey S. Montanez - Frontend Developer
NelJohn B. Genilza - Frontend Developer
Rheyan Keneth B. Pahuyo - Frontend/Backend Developer)

1. Clone the project by running terminal. Go to the directory and clone the project by running

`git clone https://github.com/yanyansimp/kane.git`

2. After the project has been successfully cloned, run the npm install in the client-app folder

> cd client-app

`npm install`

3. At the project level run dotnet restore

> cd kane

`dotnet restore`

4. Create a user-secrets on the API level

> cd API

`dotnet user-secrets set "TokenKey" "super secret key"`

5. In the API folder create a file "appsettings.json"

Paste this configuration and save

{
"ConnectionStrings": {
"DefaultConnection": "Data source=kane.db"
},
"Logging": {
"LogLevel": {
"Default": "Warning"
}
},
"AllowedHosts": "\*"
}

6. Run npm start at client-app

> cd client-app

`npm start`

7. Run dotnet watch run at API

> cd API

`dotnet watch run`

Happy Coding!
