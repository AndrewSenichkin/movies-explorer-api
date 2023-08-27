export default function handlerError(code) {
    console.log(code)
    switch(code) {
        case 409:
          return 'Данный пользователь уже зарегистрирован';

        default:
            return 'Произошла непредвиденная ошибка';
      }
}