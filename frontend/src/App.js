import {useState} from 'react';
import $ from 'jquery';

function App() {
  const [name,setName] = useState("");
  const [result, setResult] = useState([]);

  const handleChange = (event) => {
    setName(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = $(event.target)
    $.ajax({
      type: "POST",
      url: form.attr('action'),
      data: form.serialize(),
      success(data) { 
        setResult(JSON.parse(data));
      } 
    });

  }
  return (
    <div>
      <form action= "http://localhost/api.php" method = "post" onSubmit = {(event) => handleSubmit(event)}>
        <label htmlFor = "name">name</label>
        <input type = "text" name = "name" id = "name" value={name} onChange={(event) => handleChange(event)} /> 
        <button type='submit'>Submit</button>
      </form>
      <h1> {result[2]} </h1>
    </div>
  );
}

export default App;
