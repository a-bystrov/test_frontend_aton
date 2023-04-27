interface PropsAlert {
  handlerClick: () => void,
  status: number,
}

export default function Alert({ handlerClick, status }: PropsAlert) {
  return (
    <div role="presentation" className="alert" onClick={handlerClick}>
      { (status === 200)
        ? <p>Запрос успешно выполнен!</p>
        : <p>Ошибка выполнения запроса!</p>}
    </div>
  );
}
