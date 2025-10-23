# WB Tariffs Service

## Описание

Сервис для автоматического получения тарифов с Wildberries API, хранения данных в PostgreSQL и регулярной выгрузки в Google Sheets.

## Пример таблицы

Вы можете посмотреть пример обновляемой таблицы по ссылке:  
[Пример Google Sheets](https://docs.google.com/spreadsheets/d/1ieZ1XzQoLlxuad9RHJZJ7TxgW6LQQfz8v0gRYnaJJwQ/edit?usp=sharing)

## Установка и запуск:

1. Клонируйте репозиторий

```bash
git clone {repository URL}
```

2. Настройте сервисный аккаунт Google Cloud Console и скачайте JSON-ключ, сохранив его в файл `google-sa.json`.

3. Скопируйте .example.env и настройте окружение

WB_API_TOKEN — токен доступа Wildberries
SPREADSHEET_IDS — ID таблицы Google Sheets

4. Установите Docker, запустите базу данных и приложение

```bash
docker compose up -d --build
```
