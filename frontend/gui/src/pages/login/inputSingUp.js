import {useState} from 'react'
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';



export function TextInput({value,setValue,name,id,label,autoFocus=false,expresionesRegulares,autocomplete,...rest}){


    const handleChange = (e) => {
        setValue({...value, campo:e.target.value})
    }

    const validacion = (e) => {
		if(expresionesRegulares){
			if(expresionesRegulares.test(value.campo)){
				setValue({...value, valid: true});
			} else {
				setValue({...value, valid: false});
			}
		}

		// if(funcion){
		// 	funcion();
		// }
	}

    return (
        <TextField
            error={!value.valid}
            autoComplete={autocomplete}
            name={name}
            required
            fullWidth
            id={id}
            label={label}
            autoFocus={autoFocus}
            value={value.campo}
            onChange={handleChange}
            onKeyUp={validacion}
            onBlur={validacion}
            {...rest}
            style={{mt:1}}
        />
    )
  }
  
  
export function PasswordInput({name,estado,setEstado, size,...rest}){
    const [values, setValues] = useState({
      showPassword: false,
    });

    const validacion = e =>{
        if (e.target.value.length < 7){
            setEstado({...estado, valid:false})
        }else{
            setEstado({...estado, valid:true})
            
        }
    }
    
    const handleChange = (event) => {
      setEstado({ ...estado, campo: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
    return (
      <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" size={size} color={!estado.valid ? 'error' : 'primary'}>Password</InputLabel>
            <OutlinedInput
              size={size}
              error={!estado.valid}
              label="Password"
              id="outlined-adornment-password"
              name={name}
              type={values.showPassword ? 'text' : 'password'}
              value={estado.campo}
              {...rest}
              onChange={handleChange}
              onKeyUp={validacion}
              onBlur={validacion}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff  /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

      </FormControl>
    )
  }
  
  