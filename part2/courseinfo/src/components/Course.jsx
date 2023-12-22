const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name}: <b>{part.exercises}</b>
    </p>
  );
};

const Content = ({ course }) => {
  const contents = course.parts.map((part) => <Part part={part} />);
  return <>{contents}</>;
};

const Total = ({ course }) => {
  let total = course.parts.reduce((a,b) => a + b.exercises, 0)
  //course.parts.forEach((num) => (total += num.exercises));
  return <p>Total of <b>{total}</b> exercises</p>;
};


export default function Course({courses}) {
  const courseArray = courses.map(course => {
    return (
      <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </>
    )
  })
  return (
    <div className="main">
      {courseArray}
    </div>
  );
}
