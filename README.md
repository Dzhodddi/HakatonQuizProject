cd# [Quiz App]
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

Frontend:
1. TypeScript
2. Vite
3. React
4. Material UI

### Usage

## Requirements

node.js
python 3.12.3
npm
pip

To install:
```bash
sudo apt python 3.12
sudo install nodejs
sudo install npm
sudo apt-get install python3-pip
```

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
```bash
cd frontend
npm install
npm run dev
```

### Set up backend

    1. Return to root directory using ```bash cd ..``` then go to the "backend" directory using ```bash cd backend```.
    2.Create virtual enviroment uisng command ```bash python3 -m venv .venv``` or create it manually using IDE Settings -> Project -> Python Interpreter -> Add interpreter -> Add Local interpreter.
    3. Change project structure: remove content entry and than choose directory "backend" as Content Root.
    4. Activate virtual enviroment using: ```bash source .venv/bin/activate``` on Linux or ``` bash .\.venv\Scripts\activate``` on Windows




Now install all requirements: ```bash pip install -r requirements.txt" 
