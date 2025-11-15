# Password Manager Feature

## Обзор

Этот модуль содержит полнофункциональный менеджер паролей с категоризацией, поиском, фильтрацией и генерацией безопасных паролей.

## Структура типов

### Основные типы

#### `Category` (enum)
Предопределённые категории для классификации аккаунтов:
- `SOCIAL` - Соцсети
- `EMAIL` - Email
- `BANKING` - Банки
- `WORK` - Работа
- `SHOPPING` - Покупки
- `ENTERTAINMENT` - Развлечения
- `OTHER` - Другое

#### `Account` (interface)
Основная модель аккаунта:
```typescript
{
  id: string;
  website: string;
  username: string;
  password: string;
  category: Category;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### `PasswordFormData` (interface)
Данные формы для валидации и отправки:
```typescript
{
  website: string;
  username: string;
  password: string;
  category: Category;
  notes?: string;
}
```

#### `StrengthLevel` (enum)
Уровни силы пароля:
- `WEAK` - Слабый
- `FAIR` - Удовлетворительный
- `GOOD` - Хороший
- `STRONG` - Сильный
- `VERY_STRONG` - Очень сильный

#### `PasswordStrength` (interface)
Результат проверки силы пароля:
```typescript
{
  level: StrengthLevel;
  score: number; // 0-100
  color: string;
  text: string; // Локализованный текст
}
```

### Redux типы

#### `PasswordsState` (interface)
Структура состояния Redux для функционала паролей:
```typescript
{
  accounts: Account[];
  selectedCategory: string | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}
```

### Утилитарные типы

#### `PasswordGeneratorOptions` (interface)
Настройки генератора паролей:
```typescript
{
  length: number; // 8-64 символов
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}
```

#### `CategoryCount` (interface)
Статистика по категориям:
```typescript
{
  category: Category;
  count: number;
}
```

#### `FilterOptions` (interface)
Опции фильтрации списка паролей:
```typescript
{
  category?: Category | null;
  searchQuery?: string;
}
```

#### `SortBy` (enum) и `SortOrder` (enum)
Опции сортировки:
```typescript
enum SortBy {
  WEBSITE = 'website',
  USERNAME = 'username',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  CATEGORY = 'category'
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}
```

## Использование

```typescript
import { 
  Account, 
  Category, 
  PasswordFormData, 
  PasswordsState 
} from '@/features/passwords';

// Создание нового аккаунта
const newAccount: Account = {
  id: '1',
  website: 'https://example.com',
  username: 'user@example.com',
  password: 'securePassword123!',
  category: Category.WORK,
  notes: 'Рабочий аккаунт',
  createdAt: new Date(),
  updatedAt: new Date()
};

// Данные формы
const formData: PasswordFormData = {
  website: 'https://example.com',
  username: 'user@example.com',
  password: 'securePassword123!',
  category: Category.WORK,
  notes: 'Рабочий аккаунт'
};
```

## Следующие шаги

1. ✅ Создать TypeScript типы и интерфейсы
2. ⏳ Создать Redux slice с actions и reducers
3. ⏳ Создать селекторы для фильтрации и поиска
4. ⏳ Создать утилиты (passwordStrength, categoryIcons, clipboard)
5. ⏳ Создать компоненты UI

## Принципы проектирования

- **Type Safety**: Все типы строго типизированы для предотвращения ошибок времени выполнения
- **Immutability**: Структуры данных предназначены для иммутабельных обновлений
- **Extensibility**: Типы легко расширяются для будущих функций
- **Documentation**: Все типы хорошо документированы с JSDoc комментариями

