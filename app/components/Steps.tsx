const STEPS = [
  {
    num: '01',
    title: 'Tell us what you need',
    body: 'Send the form or text us. Say which item, which term, and when you want it — that is the whole ask.',
  },
  {
    num: '02',
    title: 'We quote and confirm',
    body: 'You get a price for your term and a delivery window, usually the same day you ask.',
  },
  {
    num: '03',
    title: 'Approval, if you are buying',
    body: 'Day and monthly rentals skip this. Rent-to-own runs a soft check — in-house for smaller items, through our financing partner for bigger ones.',
  },
  {
    num: '04',
    title: 'We deliver and install',
    body: 'We bring it, hook it up, and haul the old one away. Service calls during your rental are on us.',
  },
];

export function Steps() {
  return (
    <div className="steps">
      {STEPS.map((step) => (
        <div className="step" key={step.num}>
          <span className="num">{step.num}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </div>
      ))}
    </div>
  );
}
