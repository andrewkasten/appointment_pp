import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';


function Form({formType, handleInputChange, formData, handleSubmit, responseMsg}) {

  return (
    <>
    <br></br>
    <br></br>
    {responseMsg && <h2>{responseMsg}</h2>}
   
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel  htmlFor="username">Usename</InputLabel>
          
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <br></br>
        <Button  variant="contained" type="submit">{formType}</Button>
      </form>
    
    </>
  );
}

export default Form;