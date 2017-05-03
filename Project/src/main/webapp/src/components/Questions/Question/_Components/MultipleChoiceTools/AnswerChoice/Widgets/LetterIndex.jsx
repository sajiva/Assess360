import React from 'react';
const LetterIndex=(props)=>{
    const letters=['A','B','C','D','E','F','G','H'];
    return  <b className="choice-letter">{letters[props.Index]}. </b>;
};

export default LetterIndex