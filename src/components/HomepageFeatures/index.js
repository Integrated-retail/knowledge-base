import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Always up-to-date',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Articles here are synced from our internal knowledge base, so this
        content stays current.
      </>
    ),
  },
  {
    title: 'Self-service first',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Search or browse by category to find policies, product docs and
        guides without waiting on a support ticket.
      </>
    ),
  },
  {
    title: 'Still need help?',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        If you can&apos;t find what you&apos;re looking for, reach out to our
        support team directly.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
