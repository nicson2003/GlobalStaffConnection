import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

export default function InputFields(props) {
  const {inputLabel, unit, value, setValue, id, name } = props;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <FormControl sx={{ m: 2, width: '35ch' }} variant="outlined">
          <InputLabel htmlFor={id}>{`${inputLabel}`}</InputLabel>
          <OutlinedInput
            id={id}
            name={name}
            type={'number'}
            value={value}
            onChange={(evt) => {
              setValue(evt.target.value)
            }}
            endAdornment={
              <InputAdornment position="end">{`${unit}`}</InputAdornment>
            }
            label={inputLabel}
          />
        </FormControl>
      </div>
    </Box>
  );
}
