const router = require("express").Router();
const LetterValueMap = require("../models/LetterValueMap");
const { isStringValid, isLetter, getResult } = require("../utils/auxmethods");


router.post('/evaluatestring', async(req, res) => {
  try {
    let expString = req.body.expstring;

    let vals = await LetterValueMap.find();
    
    const isValidString = isStringValid(expString);

    let result = null;
    if(isValidString) {
      const map1 = new Map();
      for(let i=0;i<vals.length;i++) 
        map1.set(vals[i].letter, vals[i].value);

      for(let i=0;i<expString.length;i++) {
        if(isLetter(expString[i])) {
          let left=expString.substring(0, i);
          let right=expString.substring(i+1, expString.length);
          expString=left+map1.get(expString[i])+right;
        }
      }
      result = getResult(expString);
    }

    

    res.status(200).json({result, isStringValid: isValidString});
  } catch(error) {
    res.status(500).json({result: null, isStringValid: null});
    console.log(error);
  }
  
})

module.exports = router