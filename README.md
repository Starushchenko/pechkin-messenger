# Лог 3 спринта

[Пулл-реквест](https://github.com/Starushchenko/middle.messenger.praktikum.yandex/pull/3)

В проект добавлен роутинг, state-менеджмент (через store), утилиты для обновления данных на странице после получения 
по API. Внедрены unit-тесты для утилит.


## Pechkin Messenger

"Если бы у меня такой чат был, я и не женился бы никогда".

Уютный мессенджер, где молниеносная доставка ваших emodji — в руках Печкина.
Учебный проект курса «middle frontend-разработчик» от Яндекс.Практикума. Студент — Ярослав Старущенко.

[![ССЫЛКА НА МАКЕТ](/assets/images/readme-design-link.png)](https://www.figma.com/file/kwyb3JD0tw9wrlqFyZbA1z/pechkin-messenger?node-id=0%3A1)


## Назначение файлов и папок

```bash
assets/                        # Медиа-файлы проекта
  fonts/                       # - директория шрифтов проекта
  images/                      # - директория картинок фронтенда
src/                           # Ресурсы
  components/                  # - компоненты - наиболее мелкие запчасти проекта,
    example/                   #   включающие как правило, .ts + .scss + .tpl.hbs + interface.ts
        example.ts
        interface.js
        example.scss
        example.tpl.hbs
  modules/                     # - модули - компоненты, собирающие в себя другие компоненты из /components.
    module/                    #   Структура аналогична компонентам
        module.ts
          module.ts
          module.tpl.hbs
        module2.ts
          module2.ts
          module2.tpl.hbs
        module.scss
        interface.js
  pages/                       # - страницы - высший уровень компонентов, включающий компоненты из /components
    page/                      #   и блоки из /blocks. Содержат .ts, описывающий структуру, .tpl.hbs с шаблоном
        index.html             #   и index.html, содержащий #app, в который монтируется приложение
        page.ts
        page.tpl.hbs
  constants/                   # - константы
    constants.ts               
  stubs/                       # - словари статических данных
    *.json
  types/                       # - описание типов, используемых во всём проекте
    *.ts
    typings/                   # - декларации типов файлов для изображений, шаблонизатора, etc.
      *.hbs.d.ts                 
  utils/                       # - вспомогательные функции, используемые на всём проекте
    api/                       # - утилиты для обработки HTTP API-методов
    high-ordered/              # - hoc'и для реактивного обновления компонентов после обновления store
    router/                    # - роутер по страницам на основе Event Bus
    services/                  # - модели-контроллеры для связи представлений, api и store
    store/                     # - state-менеджер приложения
    block.ts                   # - функционал блока для реализации компонентов всех уровней
    event-bus.ts               # - обработка событий для блока
    helpers.ts                 # - вспомогательные функции
    render-dom.ts              # - хэлпер для вставки html-элемента в DOM
    http-transport.ts          # - обработчик xhr-запросов
  scss/                        # - глобальные стилевые файлы 
     base/                     # - базовые стили для всего проекта
         app.scss              # - стили для общего шаблона приложения
         fonts.scss            # - подключение и задание правил шрифтов
         mixins.scss           # - перечень примесей
         print.scss            # - стили для печати
         reset.scss            # - сброс стилей по умолчанию
         scaffolding.scss      # - общие стилевые правила для проекта
         variables.scss        # - описание используемых переменных
     style.scss                # - главный стилевой файл для импорта всех остальных
dist/                          # - папка сборки проекта. Формируется автоматически
createComponent.js             # - node-скрипт для удобного создания компонентов
```

## Команды
- `npm run start` - сборка проекта и раздача статики на порту 3000
- `npm run build` - сборка проекта в папку `/dist` с оптимизацией ресурсов
- `npm run lint` - проверка директории `/src` на наличие ошибок eslint и stylelint
- `npm run lint:fix` - проверка директории `/src` на наличие ошибок eslint и stylelint + автоматическое исправление
- `npm run test` - запуск тестов mocha + chai

## Пользователи для тестирования
| Login           | Password           |
| --------------- |:------------------:| 
| Barmalei_2      | 3U7-PS6-wRX-N6b    | 
| Yaroslav        | 79f-Dn3-gYv-t7Z    | 

## Страницы на Netlify
- [Список страниц](https://deploy--shiny-croissant-34c918.netlify.app/links)
- [Регистрация](https://deploy--shiny-croissant-34c918.netlify.app/register)
- [Авторизация](https://deploy--shiny-croissant-34c918.netlify.app/auth)
- [Мессенджер](https://deploy--shiny-croissant-34c918.netlify.app/chats)
- [Профиль](https://deploy--shiny-croissant-34c918.netlify.app/profile)
- [Изменение настроек профиля](https://deploy--shiny-croissant-34c918.netlify.app/change-settings)
- [Изменение пароля](https://deploy--shiny-croissant-34c918.netlify.app/change-password)
- [Ошибка 404](https://deploy--shiny-croissant-34c918.netlify.app/error_404)
- [Ошибка 5**](https://deploy--shiny-croissant-34c918.netlify.app/error_500)

## Стек
- `parcel` - упаковщик приложения
- `handlebars` - шаблонизатор
- `typescript` - типизация javascript
- `mocha + chai` - тестирование
- `scss + cssnano` - препроцессор стилей + оптимизация
- `eslint` - линтинг ошибок
- `stylelint` - линтинг стилей
- `nanoid` - генерация уникального id
- `store` - кастомный state-менеджмент на основе Event Bus
