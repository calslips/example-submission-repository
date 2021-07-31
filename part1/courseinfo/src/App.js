import React from 'react';

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    'Fundamentals of React',
    'Using props to pass data',
    'State of a component'
  ];
  const exercises = [
    10,
    7,
    14
  ];
  const sumExercises = (exercises) => {
    let sum = 0;
    exercises.forEach((element) => {
      sum += element;
    })
    return sum;
  };

  return (
    <>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} sumExercises={sumExercises} />
    </>
  );
}

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  );
}

const Content = (props) => {
  return (
    <div>
      <Part parts={props.parts} exercises={props.exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    props.parts.map((part, i) =>
      <p key={i}>{part} {props.exercises[i]}</p>
    )
  );
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.sumExercises(props.exercises)}
    </p>
  );
}

export default App;
