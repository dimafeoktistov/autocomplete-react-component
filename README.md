# Задание React & Redux

Необходимо реализовать обычный Autocomplete React элемент, который получает список значений, умеет по ним искать и, в случае выбора значения, отдават его пользователю компонента.

Элемент должен быть:

1. Самостоятельный и переиспользуемый;

2. Максимально универсальный.

## Реализация

Реализован компонент Autocomplete, который на входе в качестве props принимает suggestions как массив значений по которым он будет искать и предлагать пользователю значения для автоматического дополнения, и функцию getItem которая необходима для получения данных в компонент откуда пришли данные.

Основные props для кастомизации:

_inputProps_ - Использовать для того чтобы передать props для элемента input;

_inputStyles_ - Используется для инлайн стилей для инпута

_inputClass_ - Используется чтобы задать класс инпута

_listClasses_ - Используется чтобы задать класс для объектов автокомплита, имеет 2 опции _suggestionList_: класс для ul который содержит в себе список значений, и _activeSuggestion_: класс который добавляется к выбранному на данный момент значению автокомплита

Для запуска скачать репозиторий, установить зависимости и в консоли запустить команду `npm start`
