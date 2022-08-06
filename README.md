# Лог 2 спринта
Отказался от шаблонизатора `nunjucks` в пользу `handlebars` ввиду отсутствия поддерживаемого трансформера с 
precompile 😔, переписал разметку.

Подключил в проект файлы Block, renderDOM и EventBus из теории. Переделал структуру проекта, разбив основные 
сущности на компоненты (`src/components`), блоки — сборки из компонентов (`src/blocks`) и страницы 
(`src/pages`), монтируемые в #app. Декомпозировал проект, создал интерфейсы и *.ts файл под каждый компонент, блок 
страницу, наследуемые от Block. Добавил валидацию форм, используя нативный функционал field.validity с установкой 
собственной ошибки валидации при ошибке `patternMismatch`.

## Pechkin Messenger

![Pechkin Messenger](/src/images/matroskin-square.png)

"Если бы у меня такой чат был, я и не женился бы никогда".

Уютный мессенджер, где молниеносная доставка ваших emodji — в руках Печкина.
Учебный проект курса «middle frontend-разработчик» от Яндекс.Практикума. Студент — Ярослав Старущенко.

[![ССЫЛКА НА МАКЕТ](/src/images/readme-design-link.png)](https://www.figma.com/file/kwyb3JD0tw9wrlqFyZbA1z/pechkin-messenger?node-id=0%3A1)

**Статические данные в json-формате для компонентов берутся из `./data.json`**


## Назначение файлов и папок

```bash
src/                           # Ресурсы проекта
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
        page.html              #   и .html, содержащий #app, в который монтируется приложение
        page.ts
        page.tpl.hbs
  enums/                       # - справочники и словари статических данных
    data.json                  # - статические данные для вёрстки
    validation-rules.ts        # - правила валидации и тексты ошибок
  types/                       # - описание типов, используемых во всём проекте
    common.ts                  # - описание типов, используемых во всём проекте
    *.hbs.d.ts                 # - декларации типов файлов для изображений, шаблонизатора, etc.
  utils/                       # - вспомогательные функции, используемые на всём проекте
    Block.ts                   # - функционал блока для реализации компонентов всех уровней
    EventBus.ts                # - обработка событий для блока
    helpers.ts                 # - вспомогательные функции
    renderDOM.ts               # - хэлпер для вставки html-элемента в DOM
  fonts/                       # - директория шрифтов проекта
  images/                      # - директория картинок фронтенда
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
data.json                      # - статические данные для вёрстки
```

## Команды
- `npm run start` - сборка проекта в папку `/dist` и раздача статики на порту 3000
- `npm run dev` - запуск сервера для разработки
- `npm run build` - сборка проекта в папку `/dist` с оптимизацией ресурсов
- `npm run lint` - проверка директории `/src` на наличие ошибок eslint и stylelint
- `npm run lint:fix` - проверка директории `/src` на наличие ошибок eslint и stylelint + автоматическое исправление
- `node createComponent.js <component_name> <ext, ext2>` - удобное создание компонента в `/src/components`. По
  умолчанию создаёт папку с .njk и .scss. При перечислении дополнительных расширений, создаёт соответствующие файлы,
  например `node createComponent.js button js,md,img`

## Страницы на Netlify
- [Регистрация](https://deploy--shiny-croissant-34c918.netlify.app/register.html)
- [Авторизация](https://deploy--shiny-croissant-34c918.netlify.app/auth.html)
- [Чаты](https://deploy--shiny-croissant-34c918.netlify.app/)
- [Чат детально](https://deploy--shiny-croissant-34c918.netlify.app/chat.html)
- [Поиск по чатам](https://deploy--shiny-croissant-34c918.netlify.app/empty-search.html)
- [Профиль](https://deploy--shiny-croissant-34c918.netlify.app/profile.html)
- [Изменение настроек профиля](https://deploy--shiny-croissant-34c918.netlify.app/change-settings.html)
- [Изменение пароля](https://deploy--shiny-croissant-34c918.netlify.app/change-password.html)
- [Ошибка 404](https://deploy--shiny-croissant-34c918.netlify.app/error-404.html)
- [Ошибка 5**](https://deploy--shiny-croissant-34c918.netlify.app/error-500.html)

## Стек
- `parcel` - упаковщик приложения
- `handlebars` - шаблонизатор
- `typescript` - типизация javascript
- `scss + cssnano` - препроцессор стилей + оптимизация
- `eslint` - линтинг ошибок
- `stylelint` - линтинг стилей
- `express` - сервер для раздачи статики
- `nanoid` - генерация уникального id
