import React, { useRef, useState } from 'react';

const questions = [
    {
      qu: 'Full Form of HTML',
      option1: 'HyperText Mark Language',
      option2: 'HyperTest Machine Language',
      option3: 'HyperText Markup Language',
      option4: 'HyperText Markup Link',
      ans: 3
    },
    {
      qu: 'What does CSS stand for?',
      option1: 'Cascading Style Sheets',
      option2: 'Computer Style Sheets',
      option3: 'Coding Style Sheets',
      option4: 'Creative Style Sheets',
      ans: 1
    },
    {
      qu: 'Which language is used for web development?',
      option1: 'Python',
      option2: 'JavaScript',
      option3: 'Java',
      option4: 'C++',
      ans: 2
    },
    {
      qu: 'What is React primarily used for?',
      option1: 'Database Management',
      option2: 'Backend Development',
      option3: 'User Interface Development',
      option4: 'System Administration',
      ans: 3
    },
    {
      qu: 'Which HTML tag is used to define an internal style sheet?',
      option1: '<style>',
      option2: '<script>',
      option3: '<css>',
      option4: '<link>',
      ans: 1
    }
];  

function Quiz() {
  let [index,setIndex]=useState(0);
  let [qu,setQu]=useState(questions[index]);
  const [lock,setLock]=useState(false);
  const [score,setScore]=useState(0);
  let [result,setResult]=useState(false);
  const op1=useRef(null);
  const op2=useRef(null);
  const op3=useRef(null);
  const op4=useRef(null);

  const op_arr=[op1,op2,op3,op4];
  const checkAns=(e,ans)=>{
    if(lock===false){
      if(qu.ans===ans){
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev=>prev+1);
      }
      else{
        e.target.classList.add("incorrect");
        setLock(true);
        op_arr[qu.ans-1].current.classList.add("correct")
      }
    }
  }
  const next=()=>{
    if(lock===true){
      if(index===questions.length-1){
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQu(questions[index]);
      setLock(false);
      op_arr.map((opt)=>{
        opt.current.classList.remove("incorrect");
        opt.current.classList.remove("correct");
        return null;
      })
    }
  }
  const reset=()=>{
    setIndex(0);
    setQu(questions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }
  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr/>
      {result?<>
      <h2>You Scored {score} out of {questions.length}</h2>
      <button onClick={reset}>Reset</button>
      </>:
      <>
      <h2>{index+1}. {qu.qu}</h2>
          <ul>
            <li ref={op1} onClick={(e)=>{checkAns(e,1)}}>{qu.option1}</li>
            <li ref={op2} onClick={(e)=>{checkAns(e,2)}}>{qu.option2}</li>
            <li ref={op3} onClick={(e)=>{checkAns(e,3)}}>{qu.option3}</li>
            <li ref={op4} onClick={(e)=>{checkAns(e,4)}}>{qu.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className='index'>{index + 1} of {questions.length} questions</div>
      </>}
    </div>
  );
}

export default Quiz;
