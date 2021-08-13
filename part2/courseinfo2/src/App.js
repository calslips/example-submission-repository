import React from "react";

const MainHeader = ({ curriculum }) => <h1>{curriculum}</h1>;

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

const App = () => {
  const curriculum = 'Web development curriculum';
  const courses = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      id: 2,
      name: "Node.js",
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
  <div>
    <MainHeader curriculum={curriculum} />
    {courses.map((course) => <Course key={course.id} course={course} />)}
  </div>
  );
};

export default App;
