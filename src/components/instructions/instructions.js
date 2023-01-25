import uiLabels from "../../uiLabels";

function Instructions() {
  return (
    <section className="instructions text-center">
      <div>
        <h1 className="p-2">{uiLabels.instructions.title}</h1>
      </div>
    </section>
  );
}

export default Instructions;
