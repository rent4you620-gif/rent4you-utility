const STEPS = [
  {
    title: 'Tell us what you need',
    copy: 'Send the item and the term you want. We confirm availability with our supplier network — no showroom visit required.',
  },
  {
    title: 'Get approved',
    copy: 'Smaller items get a quick soft credit check from us. Bigger-ticket items route to our lease-to-own financing partner.',
  },
  {
    title: 'We order it',
    copy: 'Once you are approved we place the order and schedule delivery. Nothing is purchased before your approval lands.',
  },
  {
    title: 'Rent, return, or own',
    copy: 'Keep it on your term, hand it back when you are done, or let your payments carry you to ownership.',
  },
];

export function Steps() {
  return (
    <div className="steps">
      {STEPS.map((step, index) => (
        <div className="step" key={step.title}>
          <span className="num">0{index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.copy}</p>
        </div>
      ))}
    </div>
  );
}
