import { AboutSections } from './sections-definitions/about-section';

import CardWithImage from 'ui/cards/card-with-image';

const About = () => {
  return (
    <main className="bg-storm-dust-50 text-storm-dust-950 dark:bg-storm-dust-950 dark:text-storm-dust-50 px-6 py-16 transition-colors">
      <section
        aria-labelledby="about-finance-harbour-title"
        className="mx-auto flex max-w-6xl flex-col gap-4"
      >
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h1
            className="text-4xl font-bold tracking-tight"
            id="about-finance-harbour-title"
          >
            About Finance Harbour
          </h1>

          <p className="text-storm-dust-600 dark:text-storm-dust-300 mt-4 text-base leading-7">
            Finance Harbour helps you manage budgets, transactions, and spending
            periods in one simple place.
          </p>
        </div>

        {AboutSections.map((section) => (
          <CardWithImage
            id={section.id}
            imageAlt={section.imageAlt}
            imageSrc={section.imageSrc}
            isImageRight={section.isImageRight}
            key={section.id}
            title={section.title}
          >
            <p>{section.text}</p>
          </CardWithImage>
        ))}
      </section>
    </main>
  );
};

export default About;
