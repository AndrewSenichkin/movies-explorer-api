import { useState, useCallback } from "react";

//Hook useForm для управления состоянием формы
const useForm = () => {
    //Состояние для хранения введенных значений полей формы.
    const [values, setValues] = useState({});
    //Состояние для хранения ошибок валидации полей формы.
    const [errors, setErrors] = useState({});
    //Состояние, указывающее на валидность всей формы.
    const [inactive, setInactive] = useState(false);
  
    //Обработчик изменений полей формы. Обновляет состояния
    // введенных значений, ошибок валидации и валидности формы.
    const handleChangeInput = (event) => {
      const name = event.target.name
      const value = event.target.value
  
      // Обновляем состояние введенных значений
      setValues({
        ...values,
        [name]: value,
      })
  
      // Обновляем состояние ошибок валидации
      setErrors({
        ...errors,
        [name]: event.target.validationMessage,
      })
  
      // Обновляем состояние валидности формы
      setInactive
      (event.target.closest(".form").checkValidity())
    }
  
    //Функция для сброса формы. Устанавливает новые значения состояний формы, переданные в аргументах.
    const resetForm = useCallback(
      (values = {}, newErrors = {}, newinactive = false) => {
        // Устанавливаем новые значения состояний формы
        setValues(values)
        setErrors(newErrors)
        setInactive
        (newinactive)
      },
      [setValues, setErrors, setInactive
      ]
    )
    // Возвращаем состояния и функции для управления формой
    return {
      values,
      handleChangeInput,
      inactive,
      errors,
      resetForm,
    }
  }
  
  //Код представляет собой хук (hook) useForm, который упрощает
  // управление состоянием и валидацией формы в React-компонентах.
  
  export default useForm;