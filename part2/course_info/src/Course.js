import React from 'react'
const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  const render = parts.map(( part ) => <Part key={part.id} part={part.name} exercises={part.exercises} />);
return (
  render
)
}

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    // console.log('what is happening', s, p)
    if (isNaN(s.exercises)) return s + p.exercises;
    else return s.exercises + p.exercises;
  });
  return (
    <h3>total of {total} exercises </h3>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default Course