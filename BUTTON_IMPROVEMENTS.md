# 🎨 Button Component Improvements

## ✨ What's New

Кнопки полностью переработаны на стандартный стиль Material-UI!

### 🚀 Ключевые изменения:

1. **Стандартный MUI стиль**: Теперь все кнопки используют нативный Material-UI дизайн
2. **Убраны кастомные градиенты**: Использован чистый MUI API для лучшей совместимости
3. **Стандартные варианты**: `contained`, `outlined`, `text` вместо кастомных
4. **Стандартные размеры**: `small`, `medium`, `large`
5. **Иконки**: Поддержка `startIcon` и `endIcon` по стандарту MUI
6. **Полная совместимость**: Все стандартные MUI props доступны

## 🎯 Варианты кнопок:

### Contained (Заполненная)
- Стандартная MUI кнопка с заливкой
- Используется для основных действий (Continue, Submit, Sign In)
- Цвета: `primary`, `secondary`, `error`, `warning`, `info`, `success`

### Outlined (Обводка)
- Прозрачная кнопка с рамкой
- Используется для вторичных действий (Back, Cancel)
- Те же цвета что и Contained

### Text (Текстовая)
- Минималистичная кнопка без фона и рамки
- Используется для ссылок и неосновных действий

## 📐 Размеры:

- **small**: Малый
- **medium**: Средний - **рекомендуется**
- **large**: Большой

## 🎨 Иконки:

Используйте `startIcon` для иконки слева и `endIcon` для иконки справа:

```tsx
<Button
  variant="contained"
  color="primary"
  startIcon={<ArrowBackIcon />}
>
  Back
</Button>

<Button
  variant="contained"
  color="primary"
  endIcon={<ArrowForwardIcon />}
>
  Continue
</Button>
```

## 💡 Примеры использования:

### Основная кнопка
```tsx
<Button
  variant="contained"
  color="primary"
  size="medium"
  fullWidth
  onClick={handleSubmit}
>
  Sign In
</Button>
```

### Кнопка с обводкой
```tsx
<Button
  variant="outlined"
  size="medium"
  onClick={handleBack}
>
  Cancel
</Button>
```

### Кнопка с иконкой
```tsx
<Button
  variant="contained"
  color="primary"
  endIcon={<ArrowForwardIcon />}
  disabled={isLoading}
>
  {isLoading ? 'Loading...' : 'Continue'}
</Button>
```

### Back Button (Назад)
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
</svg>
```

### Continue Button (Продолжить)
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>
```

### Verify Button (Проверить)
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
</svg>
```

### Loading Spinner (Загрузка)
```tsx
<svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
```

## 💡 Примеры использования:

### Back + Continue (Стандартная навигация)
```tsx
<div className="flex gap-3 mt-2">
  <Button
    onClick={onPrevious}
    variant="outline"
    size="md"
    className="flex-1"
    icon={<BackIcon />}
    iconPosition="left"
  >
    Back
  </Button>
  <Button
    onClick={onNext}
    disabled={isLoading}
    size="md"
    className="flex-1"
    icon={isLoading ? <Spinner /> : <ForwardIcon />}
    iconPosition="right"
  >
    {isLoading ? 'Saving...' : 'Continue'}
  </Button>
</div>
```

### Single Continue (Первый шаг)
```tsx
<Button
  onClick={handleNext}
  disabled={isLoading}
  size="md"
  className="w-full mt-2"
  icon={isLoading ? <Spinner /> : <ForwardIcon />}
  iconPosition="right"
>
  {isLoading ? 'Saving...' : 'Continue'}
</Button>
```

## 🎭 Особенности:

- **Hover эффект**: Плавное изменение градиента и тени
- **Active эффект**: Легкое сжатие при нажатии (scale-95)
- **Focus ring**: Красивое кольцо фокуса для доступности
- **Disabled состояние**: Полупрозрачность без интерактивности

## 📦 Обновленные файлы:

### RegistrationForm (Tailwind CSS)
- `RegistrationForm/src/components/Button.tsx`
- `RegistrationForm/src/components/steps/Step1BasicInfo.tsx`
- `RegistrationForm/src/components/steps/Step3Security.tsx`
- `RegistrationForm/src/components/steps/Step4Verification.tsx`

### src/Components (Material-UI)
- `src/Components/Registration/Button.tsx`
- `src/Components/Registration/steps/Step1BasicInfo.tsx`
- `src/Components/Registration/steps/Step3Security.tsx`
- `src/Components/Registration/steps/Step4Verification.tsx`

## 🌟 Результат:

Теперь кнопки выглядят намного более профессионально и современно:
- ✅ Компактные и хорошо выровненные
- ✅ Привлекательные визуально
- ✅ Интуитивно понятные с иконками
- ✅ Отзывчивые анимации
- ✅ Доступные для всех пользователей

---

Приятной работы с новыми кнопками! 🎉

