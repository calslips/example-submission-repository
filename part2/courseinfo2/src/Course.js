import React from 'react';

const SubHeader = ({ course }) => <h2>{course.name}</h2>;

const Total = ({ course }) => {
  const sum = course.parts.reduce(
    (sumOfEx, part) => (sumOfEx += part.exercises),
    0
  );
  return (
    <p>
      <b>total of {sum} exercises</b>
    </p>
  );
};

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = ({ course }) => (
  <div>
    {course.parts.map((part, i) => (
      <Part key={course.parts[i].id} part={course.parts[i]} />
    ))}
    <Total course={course} />
  </div>
);

const Course = ({ course }) => {
  return (
    <div>
      <SubHeader course={course} />
      <Content course={course} />
    </div>
  );
};

export default Course;