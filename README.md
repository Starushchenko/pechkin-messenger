# Pechkin Messenger

![Pechkin Messenger](/src/images/matroskin-square.png)

"Если бы у меня такой чат был, я и не женился бы никогда".

Уютный мессенджер, где молниеносная доставка ваших emodji — в руках Печкина.
Учебный проект курса «middle frontend-разработчик» от Яндекс.Практикума. Студент — Ярослав Старущенко.

[![ССЫЛКА НА МАКЕТ](/src/images/readme-design-link.png)](https://www.figma.com/file/kwyb3JD0tw9wrlqFyZbA1z/pechkin-messenger?node-id=0%3A1)

**Статические данные в json-формате для компонентов берутся из `./data.json`**


## Назначение файлов и папок

```bash
src/                           # Ресурсы проекта
  components/                  # - компоненты проекта (включающие как правило, .html + .scss + .js)
    example/
        example.html
        example.js
        example.scss
  fonts/                       # - директория шрифтов проекта
  pages/                       # - список страниц проекта
  images/                      # - директория картинок фронтенда
  js/                          # - глобальные и вспомогательные скрипты, которые не относятся к компонентам
    script.js                  # - основной диспетчер скриптов проекта
    common.js                  # - общие инициализации скриптов для сайта
    constants.js               # - глобальные js-переменные, используемые в разработке
    helpers.js                 # - переиспользуемые функции всего проекта
  layouts/                     # - шаблоны html-страниц
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
  data.json                    # - тестовые массивы данных, используемые в вёрстке
dist/                          # - папка сборки проекта. Формируются автоматически
server/                        # - файлы express для раздачи статики
createComponent.js             # - node-скрипт для удобного создания компонентов
data.json                      # - статические данные для вёрстки
```

## Команды
- `npm run start` - сборка проекта в папку `/dist` и раздача статики на порту 3000
- `npm run dev` - запуск сервера для разработки
- `npm run build` - сборка проекта в папку `/dist` с оптимизацией ресурсов
- `npm run lint` - проверка директории `/src` на наличие ошибок eslint
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
- `nunjucks` - шаблонизатор для сниппетов
- `sass + cssnano` - препроцессор стилей + оптимизация
- `eslint` - линтинг ошибок
- `express` - сервер для раздачи статики
