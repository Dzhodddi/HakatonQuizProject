# [Quiz App]
An web application to take and make quizzes for any topics. Testing task from NT20H (Test task INT20H). [Visit app](http://13.60.96.236:5173)

## Information

### Tools and Tech

Backend:
1. Python 3.12
2. FastAPI
3. SQL (sqlite3)
4. SQLAlchemy
5. Git
6. Nginx
7. EC2
8. uvicorn
9. WebSockets for live updating

Frontend:
1. TypeScript
2. Vite
3. React
4. Material UI

### Usage

# Requirements
```
node.js

python 3.12.3

npm
 
pip
```

To install:
```
sudo apt python 3.12
sudo install nodejs
sudo install npm
sudo apt-get install python3-pip
```
## Set up project

Create new directory and use commands: 

```git init```

```git branch -M main```

```git remote add origin https://github.com/Dzhodddi/HakatonQuizProject.git```

```git pull https://github.com/Dzhodddi/HakatonQuizProject.git ```

## Set up backend

Go to the "backend" directory using ```cd backend```.


Create virtual enviroment uisng command ```python3 -m venv .venv``` or create it manually using IDE Settings -> Project -> Python Interpreter -> Add interpreter -> Add Local interpreter.


Change project structure: remove content entry and than choose directory "backend" as Content Root.


Activate virtual enviroment using: ```source .venv/bin/activate``` on Linux or ``` .\.venv\Scripts\activate``` on Windows


Now install all requirements: ```pip install -r requirements.txt ```

Back to "backend" directory and go to "src" directory

Run ```uvicorn main:app```


### Set up frontend

In folder frontend in file "vite.config.host" delete:
```
server: {
    host: '0.0.0.0',
    port: 5173,
  },
```
Now it will run on your localhost

To run application use this commands:
```
cd frontend:
npm install
npm run dev
```
In frontend directory create file with name .env and add this ```VITE_API_BASE_URL="http://127.0.0.1:8000"```
