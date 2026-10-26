const STEPS = [
  {
    number: '1',
    title: 'Request',
    description: 'Fill out our form or call us with the item you need and your preferred term.',
  },
  {
    number: '2',
    title: 'Review',
    description: 'Our team checks availability and follows up with pricing for your requested item and rental period.',
  },
  {
    number: '3',
    title: 'Arrange delivery',
    description: 'Once your rental is confirmed, we coordinate the next steps with you.',
  },
  {
    number: '4',
    title: 'Enjoy',
    description: 'Use your rental for the agreed period and contact us if you have any questions.',
  },
];

export function Steps() {
  return (
    <div className="steps-container">
      {STEPS.map((step, index) => (
        <div key={index} className="step">
          <div className="step-number">{step.number}</div>
          <div className="step-content">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
          {index < STEPS.length - 1 && <div className="step-line" />}
        </div>
      ))}

      <style jsx>{`
        .steps-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
          position: relative;
        }

        .step {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          position: relative;
        }

        .step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background-color: var(--color-primary);
          color: white;
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .step-content h3 {
          margin: 0 0 0.5rem 0;
          color: var(--color-text-primary);
          font-size: 1.1rem;
        }

        .step-content p {
          margin: 0;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .step-line {
          position: absolute;
          left: 25px;
          top: 50px;
          width: 2px;
          height: 100px;
          background-color: var(--color-border);
        }

        .step:last-child .step-line {
          display: none;
        }

        @media (max-width: 768px) {
          .steps-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .step-line {
            height: 80px;
          }
        }

        @media (max-width: 600px) {
          .step-number {
            width: 45px;
            height: 45px;
            font-size: 1.2rem;
          }

          .step-content h3 {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
