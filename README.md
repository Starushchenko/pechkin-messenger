# Лог 2 спринта

[Пулл-реквест](https://github.com/Starushchenko/middle.messenger.praktikum.yandex/pull/2)

Отказался от шаблонизатора `nunjucks` в пользу `handlebars` в виду отсутствия поддерживаемого трансформера с 
precompile 😔, переписал разметку.

Подключил в проект файлы Block, renderDOM и EventBus из теории. Переделал структуру проекта, разбив основные 
сущности на компоненты (`src/components`), блоки — сборки из компонентов (`src/blocks`) и страницы 
(`src/pages`), монтируемые в #app. Декомпозировал проект, создал интерфейсы и *.ts файл под каждый компонент, блок 
страницу, наследуемые от Block. Добавил валидацию форм, используя нативный функционал field.validity с установкой 
собственной ошибки валидации при ошибке `patternMismatch`. Добавил класс HTTPTransport для обработки запросов, 
обернул в ts.

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
  blocks/                      # - блоки - компоненты, собирающие в себя компоненты из /components.
    block/                     #   Структура аналогична компонентам
        block1.ts
          block1.ts
          block1.tpl.hbs
        block2.ts
          block2.ts
          block2.tpl.hbs
        block.scss
        interface.js
  pages/                       # - страницы - высший уровень компонентов, включающий компоненты из /components
    page/                      #   и блоки из /blocks. Содержат .ts, описывающий структуру, .tpl.hbs с шаблоном
        index.html             #   и index.html, содержащий #app, в который монтируется приложение
        page.ts
        page.tpl.hbs
  constants/                   # - константы
    validation-rules.ts        # - правила валидации и тексты ошибок
    http-methods.ts            # - методы xhr-запросов
  stubs/                       # - словари статических данных
    *.json
  types/                       # - описание типов, используемых во всём проекте
    common.ts                  # - описание типов, используемых во всём проекте
    *.hbs.d.ts                 # - декларации типов файлов для изображений, шаблонизатора, etc.
  utils/                       # - вспомогательные функции, используемые на всём проекте
    Block.ts                   # - функционал блока для реализации компонентов всех уровней
    EventBus.ts                # - обработка событий для блока
    helpers.ts                 # - вспомогательные функции
    renderDOM.ts               # - хэлпер для вставки html-элемента в DOM
    HTTPTransport.ts           # - обработчик xhr-запросов
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
server/                        # - файлы express для раздачи статики
createComponent.js             # - node-скрипт для удобного создания компонентов
```

## Команды
- `npm run start` - сборка проекта в папку `/dist` и раздача статики на порту 3000
- `npm run dev` - запуск сервера для разработки
- `npm run build` - сборка проекта в папку `/dist` с оптимизацией ресурсов
- `npm run lint` - проверка директории `/src` на наличие ошибок eslint и stylelint
- `npm run lint:fix` - проверка директории `/src` на наличие ошибок eslint и stylelint + автоматическое исправление

## Страницы на Netlify
- [Список страниц](https://deploy--shiny-croissant-34c918.netlify.app/index/)
- [Регистрация](https://deploy--shiny-croissant-34c918.netlify.app/register/)
- [Авторизация](https://deploy--shiny-croissant-34c918.netlify.app/auth/)
- [Чаты](https://deploy--shiny-croissant-34c918.netlify.app/)
- [Чат детально](https://deploy--shiny-croissant-34c918.netlify.app/chat/)
- [Поиск по чатам](https://deploy--shiny-croissant-34c918.netlify.app/empty-search/)
- [Профиль](https://deploy--shiny-croissant-34c918.netlify.app/profile/)
- [Изменение настроек профиля](https://deploy--shiny-croissant-34c918.netlify.app/change-settings/)
- [Изменение пароля](https://deploy--shiny-croissant-34c918.netlify.app/change-password/)
- [Ошибка 404](https://deploy--shiny-croissant-34c918.netlify.app/error-404/)
- [Ошибка 5**](https://deploy--shiny-croissant-34c918.netlify.app/error-500/)

## Стек
- `parcel` - упаковщик приложения
- `handlebars` - шаблонизатор
- `typescript` - типизация javascript
- `scss + cssnano` - препроцессор стилей + оптимизация
- `eslint` - линтинг ошибок
- `stylelint` - линтинг стилей
- `express` - сервер для раздачи статики
- `nanoid` - генерация уникального id
