const STEPS = [
  {
    num: '01',
    title: 'Apply',
    body: 'Pick an item and apply in a couple minutes. Smaller items are approved by us; bigger-ticket items go through our financing partner.',
  },
  {
    num: '02',
    title: 'Get approved',
    body: "We — or our financing partner — confirm your rate and term. Nothing is ordered until you're approved.",
  },
  {
    num: '03',
    title: 'We order it',
    body: 'Once approved, we order your exact item — no warehouse, no guessing on stock.',
  },
  {
    num: '04',
    title: 'Delivered, pay your way',
    body: 'Your item ships to you. Weekly or monthly payments — rent-to-own payments count toward ownership, every time.',
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
