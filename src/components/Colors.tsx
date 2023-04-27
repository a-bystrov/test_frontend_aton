import { useState, useEffect } from 'react';
import loadingImg from '../images/loading.png';

interface IColor {
  id: number,
  name: string,
  year: number,
  color: string,
  pantone_value: string
}

export default function Colors({ setStatus }: { setStatus: (status: number) => void }) {
  const [colorsData, setColorsData] = useState([] as IColor[]);
  const [countPages, setCountPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Получение данных с сервера
  async function getColorsData(page: number) {
    const response = await fetch(`https://reqres.in/api/{resource}?delay=2&page=${page}&per_page=4`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    const colors = result.data;
    setStatus(response.status);
    setColorsData([...colorsData, ...colors]);
  }

  useEffect(() => {
    getColorsData(1);
  }, []);

  // Обработчик нажатия кнопки для перехода к следующей странице таблицы,
  // отправка запроса на сервер для получения дополнительных данных
  function handlerNextPage() {
    const pageCurrent = currentPage;
    if (pageCurrent === 3) {
      return;
    }

    setCurrentPage(currentPage + 1);
    if (pageCurrent + 1 > countPages) {
      const pagesCount = countPages;
      setCountPages(pagesCount + 1);
      getColorsData(pagesCount + 1);
    }
  }

  // Обработчик нажатия кнопки для перехода к предыдущей странице таблицы
  function handlerPreviousPage() {
    const curPage = currentPage;
    if (curPage === 1) {
      return;
    }

    setCurrentPage(curPage - 1);
  }

  return (
    <main>
      <div className="colorsPage">
        <button type="button" className="arrowBack" onClick={handlerPreviousPage}>{'<'}</button>
        <table className="colors">
          <caption>ЦВЕТА</caption>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>year</th>
              <th>color</th>
              <th>pantone_value</th>
            </tr>
          </thead>
          <tbody>
            {colorsData.slice(currentPage * 4 - 4, currentPage * 4).length !== 0
              && colorsData.slice(currentPage * 4 - 4, currentPage * 4).map((color) => (
                (
                  <tr key={color.id}>
                    <td>{color.id}</td>
                    <td>{color.name}</td>
                    <td>{color.year}</td>
                    <td>{color.color}</td>
                    <td>{color.pantone_value}</td>
                  </tr>
                )))}
          </tbody>
        </table>
        <button type="button" className="arrowForward" onClick={handlerNextPage}>{'>'}</button>
      </div>
      {colorsData.slice(currentPage * 4 - 4, currentPage * 4).length === 0
        && <img src={loadingImg} alt="loading" className="loadingImg" />}
    </main>
  );
}
