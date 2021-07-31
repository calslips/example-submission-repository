import React from 'react';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, i) => {
        return <Part key={i} name={props.parts[i].name} exercises={props.parts[i].exercises}/>
      })}
    </div>
  );
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  );
}

const Total = (props) => {
  let sum = 0;
  props.parts.forEach((part) => {
    sum += part.exercises;
  });
  return (
    <p>Number of exercises {sum}</p>
  );
}

export default App;
