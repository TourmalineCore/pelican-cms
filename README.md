# pelican-cms

Больше информации и проекте и связанных репозиториях можно найти здесь: 
[pelican-documentation](https://github.com/TourmalineCore/pelican-documentation).

### Локальный запуск

Добавьте файл .env на основе .env.example.

Установите необходимые зависимости:
```
npm ci
```
Запуск сборки админ панели [Подробнее читать тут](https://docs.strapi.io/dev-docs/cli#strapi-build):

```
npm run build
```

Чтобы в дальнейшем успешно запустить Strapi локально, выполните следующую команду `docker-compose --profile db-only up -d`, чтобы запустить только базу данных в docker.

Чтобы запустить только minio-s3, выполните следующую команду `docker-compose --profile minio-s3-only up -d`

Чтобы запустить базу данных и minio-s3, выполните следующую команду `docker-compose --profile db-and-minio-s3 up -d`.

minio-s3 будет доступен по следующему url http://localhost:9001 
Для входа введите:
- `username`: *admin*
- `password`: *rootPassword*

Запуск Strapi в режиме разработки [Подробнее читать тут](https://docs.strapi.io/dev-docs/cli#strapi-develop):

```
npm run develop
```

Запуск Strapi [Подробнее читать тут](https://docs.strapi.io/dev-docs/cli#strapi-start):

```
npm run start
```

Запуск Strapi без хранилища s3. Для работы в этом режиме вам не обязательно нужно указывать данные для s3.
```
npm run develop:no-s3
npm run start:no-s3
```

Strapi будет доступна по следующему url http://localhost:1337/admin

Если вы не переопределяли данные администратора в .env, по умолчанию они будут такие:
- `email`: *admin@init-strapi-admin.strapi.io*
- `password`: *admin*

Документации swagger доступна по следующему url http://localhost:1337/documentation


### Запуск тестов на Playwright

После успешного запуска Strapi (его можно открыть по адресу http://localhost:1337/admin), оставив первый терминал активным в отдельной вкладке терминала, вы можете запустить тесты в headless-режиме (без пользовательского интерфейса браузера), выполнив следующий скрипт:

*для успешного прохождения тестов, которые проверяют взаимодействие CMS и UI необходимо запустить проект [pelican-ui](https://github.com/TourmalineCore/pelican-ui) в режиме работы с API*

```bash
npm run test-e2e
```

Запуск тестов в режиме с интерфейсом Playwright:

```bash
npm run test-e2e:ui
```

### Запуск в Docker

#### Profiles
- local-run - запуск cms и базы данных
- db-only - запуск только базы данных

Для запуска Strapi, базы данных и minio-s3 в Docker, выполните следующую команду `docker-compose --profile local-run up -d`

Strapi будет доступна по следующему url http://localhost:1337/admin

minio-s3 будет доступен по следующему url http://localhost:9001 
