import logo from "./assets/react.svg";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
};

const Content = ({ course }) => {
  const contents = course.parts.map((part) => <Part part={part} />);
  return <>{contents}</>;
};

const Total = ({ course }) => {
  let total = 0;
  course.parts.forEach((num) => (total += num.exercises));
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div className="container">
      <img src={logo} className="logo" />
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
