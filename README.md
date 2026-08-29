# Geospatial objects - одностраничное приложение для работы с гео-объектами

```aiignore
# **Быстрый старт:**

npm install
npm run dev

Открой http://localhost:5173
```


# **Структура проекта:**
```aiignore
src/
├── assets /
│   ├── main/              # Глобальные стили                    
├── components/            # Переиспользуемые компоненты
│              
├── composables /           
│   └── useDrawing/        # Функция для работы с полигонами на карте
|
├── config/                # JSON- конфиг с данными для формы
├── constants/             # Переиспользуемые константы
├── pages/                 # Страницы приложения
|               
├── router/                # Роутинг
└── stores/                
├── types/                 

```

```aiignore

## Доступные скрипты

| Скрипт | Что делает |
|--------|------------|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Сборка для продакшена |
| `npm run lint` | Проверка ESLint + Stylelint |

```
