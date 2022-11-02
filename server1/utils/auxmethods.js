
const mexp = require("math-expression-evaluator");


const isLetter = (char) => {
  return(char>='A' && char<='Z');
}
const isStringValid = (expString) => {
  let idx=-1;
  for(let i=0;i<expString.length;i++) {
    if(expString[i]==='>' || expString[i]==='<') {
      idx=i;
      break;
    }
  }
  console.log(idx);
  if(idx===-1 || idx===expString.length-1 || idx===0 || !isLetter(expString[idx-1]))
    return(false);

  for(let i=0;i<idx;i++) {
    if(i%2==0 && !isLetter(expString[i]))
      return(false);
    if(i%2!=0 && isLetter(expString[i])) 
      return(false);
  }
  return(true);
}

const getResult = (exp) => {
  let idx=0;
  for(let i=0;i<exp.length;i++) {
    if(exp[i]==='>' || exp[i]==='<') {
      idx=i;
      break;
    }
  }
  const lhsVal = mexp.eval(exp.substring(0, idx));
  const rhsVal = parseInt(exp.substring(idx+1, exp.length));

  let result=true;
  if(exp[idx]==='>')
    if(lhsVal<=rhsVal)
      result=false;
  else if(exp[idx]==='<')
    if(lhsVal>=rhsVal)
      result=false;
  return(result);
}

module.exports = { isLetter, getResult, isStringValid }