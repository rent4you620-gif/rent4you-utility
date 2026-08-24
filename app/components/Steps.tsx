const steps = [
  ['01', 'Tell us what you need', 'Choose the item and the rental path that fits your situation.'],
  ['02', 'Get a clear quote', 'We confirm availability, delivery details, and straightforward terms.'],
  ['03', 'Complete approval', 'Direct and partner-assisted options keep the process practical.'],
  ['04', 'Schedule delivery', 'Once approved, we coordinate delivery around your schedule.'],
];

export function Steps() {
  return (
    <div className="steps">
      {steps.map(([number, title, description]) => (
        <article className="step" key={number}>
          <span className="num">{number}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}
