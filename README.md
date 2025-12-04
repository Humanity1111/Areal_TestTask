# Articles & Comments

Система управления статьями и комментариями.

## Технологии
- Backend: Node.js, Express, Sequelize, PostgreSQL  
- Frontend: Vue.js, Vue Router, Axios

## Запуск

### Backend
```bash
cd articles-backend
npm install
npx sequelize-cli db:migrate
node app.js
```
Frontend
```bash
cd articles-frontend
npm install
npm run serve
```
API
```
GET /articles — список статей

GET /article/:id — статья с комментариями

POST /article — создать статью

PATCH /article/:id — обновить статью

DELETE /article/:id — удалить статью

POST /article/:id/comment — добавить комментарий

GET /article/:id/comments — все комментарии

PATCH /article/:id/comment/:commentId — обновить комментарий

DELETE /article/:id/comment/:commentId — удалить комментарий

GET /analytic/comments?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD — аналитика комментариев
```