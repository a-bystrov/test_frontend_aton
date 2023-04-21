import { useState, useEffect } from 'react';

interface IColor {
  id: number,
  name: string,
  year: number,
  color: string,
  pantone_value: string
}

export default function Colors() {
  const [сolorsData, setColorsData] = useState([] as IColor[]);

  async function getColorsData() {
    const response = await fetch('https://reqres.in/api/{resource}?page=1&per_page=5', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    const colors = result.data;
    setColorsData(colors);
  }

  useEffect(() => {
    getColorsData();
  }, []);

  return (
    <table className="colors">
      <caption>COLORS</caption>
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
        {сolorsData.map((color) => (
          <tr key={color.id}>
            <td>{color.id}</td>
            <td>{color.name}</td>
            <td>{color.year}</td>
            <td>{color.color}</td>
            <td>{color.pantone_value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
