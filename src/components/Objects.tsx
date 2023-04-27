import React, { useState } from 'react';
import editingImg from '../images/editing.png';
import deleteImg from '../images/delete.png';

interface IObject {
  title: string,
  description: string
}

export default function Objects() {
  const [objects, setObjects] = useState<IObject[]>([]);
  const [modalCreateObj, setModalCreateObj] = useState(false);
  const [modalEditingObj, setModalEditingObj] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleBeforeEditing, setTitleBeforeEditing] = useState('');

  // Обработчик для изменений в полях ввода данных, обновление состояний
  function handlerChangeInput(event: React.FormEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.value as string;
    switch (target.className) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  }

  // Открытие модального окна для создания нового объекта
  function handlerOpenModalCreateObj() {
    setModalCreateObj(true);
  }

  // Очистка состояний в модальном окне
  function clearStateModal() {
    setTitle('');
    setDescription('');
  }

  // Создание нового объекта
  function addObject() {
    const obj: IObject = {
      title,
      description,
    };

    for (let i = 0; i < objects.length; i += 1) {
      if (objects[i].title === title) {
        alert('Уже есть объект с таким названием!');
        return;
      }
    }

    if (title === '') {
      alert('Пустое поле "Название"!');
      return;
    }

    setObjects([...objects, obj]);

    clearStateModal();
    setModalCreateObj(false);
  }

  // Закрытие модального окна создания объекта
  function handlerCloseModalCreate() {
    clearStateModal();
    setModalCreateObj(false);
  }

  // Открытие модального окна для редактирования объекта
  function handlerOpenModalEditing(event: React.MouseEvent) {
    const target = event.target as HTMLInputElement;
    const currentTitle = target.parentElement?.parentElement?.previousElementSibling?.textContent;
    let currentDescription;

    for (let i = 0; i < objects.length; i += 1) {
      if (objects[i].title === currentTitle) {
        currentDescription = objects[i].description;
      }
    }

    setTitle(currentTitle as string);
    setTitleBeforeEditing(currentTitle as string);
    setDescription(currentDescription as string);

    setModalEditingObj(true);
  }

  // Сохранение изменений в объекте
  function saveEditingObject() {
    const currentObjects = objects;
    for (let i = 0; i < currentObjects.length; i += 1) {
      if (currentObjects[i].title === titleBeforeEditing) {
        currentObjects[i].title = title;
        currentObjects[i].description = description;
      }
    }

    setObjects(currentObjects);
    clearStateModal();
    setModalEditingObj(false);
  }

  // Закрытие модального окна редактирования объекта
  function handlerCloseModalEditing() {
    clearStateModal();
    setModalEditingObj(false);
  }

  // Удаление объекта
  function deleteObj(event: React.MouseEvent) {
    const target = event.target as HTMLInputElement;
    const currentTitle = target.parentElement?.parentElement?.previousElementSibling?.textContent;

    setObjects(objects.filter((obj) => obj.title !== currentTitle));
  }

  return (
    <main className="objectsPage">
      {modalCreateObj
      && (
        <div className="modalObj">
          <form className="formObj">
            <h1>Новый объект</h1>
            <input type="text" placeholder="Название" className="title" onChange={handlerChangeInput} />
            <textarea placeholder="Описание" className="description" onChange={handlerChangeInput} />
            <button type="button" className="createObjectBtn" onClick={addObject}>Создать</button>
            <button type="button" className="closeModalBtn" onClick={handlerCloseModalCreate}>X</button>
          </form>
        </div>
      )}
      {modalEditingObj
      && (
        <div className="modalObj">
          <form className="formObj">
            <h1>Редактирование</h1>
            <input type="text" placeholder="Название" className="title" onChange={handlerChangeInput} value={title} />
            <textarea placeholder="Описание" className="description" onChange={handlerChangeInput} value={description} />
            <button type="button" className="editingObjectBtn" onClick={saveEditingObject}>Сохранить изменения</button>
            <button type="button" className="closeModalBtn" onClick={handlerCloseModalEditing}>X</button>
          </form>
        </div>
      )}
      <button type="button" className="openModalCreateObj" onClick={handlerOpenModalCreateObj}>Создать объект</button>
      {objects.map((obj) => (
        <div className="object" key={obj.title}>
          <p>{obj.title}</p>
          <div>
            <button type="button" onClick={handlerOpenModalEditing}><img src={editingImg} alt="редактировать" /></button>
            <button type="button" onClick={deleteObj}><img src={deleteImg} alt="удалить" /></button>
          </div>
        </div>
      ))}
    </main>
  );
}
