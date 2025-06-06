# Booking Service Backend

Прототип системы бронирования переговорных комнат в бизнес-центре.

## Архитектура

Проект построен по **чистой модульной архитектуре** NestJS с разделением на слои:

- `Controllers` — отвечает за маршруты и валидацию входных данных.
- `Services` — бизнес-логика (например, проверка на пересечение бронирований).
- `Repositories` — работа с базой данных через TypeORM.
- `DTO / RTO` — объекты валидации и возвращаемые форматы.
- `Guards / Decorators` — авторизация и защита роутов по ролям.

## ⚙️ Технологии

| Название         | Причина выбора                                  |
|------------------|--------------------------------------------------|
| **NestJS + TS**  | Современный фреймворк с поддержкой DI, модулей и тестов |
| **PostgreSQL**   | Надёжная и гибкая СУБД                           |
| **TypeORM**      | Удобный ORM для работы с PostgreSQL              |
| **Docker**       | Изоляция окружения, быстрое развертывание        |
| **JWT**          | Безопасная авторизация с токенами                |
| **bcrypt**       | Хеширование паролей                              |


### Основной функционал

- Регистрация и логин
- Защищённый доступ по JWT
- CRUD пользователей (только для админов)
- CRUD переговорных комнат
- Бронирование комнат с проверкой на пересечения
- Получение своих активных броней
- Удаление своей брони
- Роуты защищены JwtGuard и RolesGuard

## 📦 Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск docker-базы
docker-compose up -d

# Запуск backend-приложения
npm run start:dev
