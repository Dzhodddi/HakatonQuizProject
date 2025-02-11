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

##Usage
Requirements:

node.js -v:
python 3.12.3

Set up frontend:

In folder frontend in file "vite.config.host" delete:
```
server: {
    host: '0.0.0.0',
    port: 5173,
  },
```
Now it will run on your localhost


```bash
cd frontend
npm install
npm run dev
```
