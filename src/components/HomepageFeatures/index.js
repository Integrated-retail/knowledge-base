import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function RefreshIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 11a8 8 0 0 0-14.93-3.36M4 4v5h5" />
      <path d="M4 13a8 8 0 0 0 14.93 3.36M20 20v-5h-5" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SupportIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="2.5" y="13" width="5" height="7" rx="2" />
      <rect x="16.5" y="13" width="5" height="7" rx="2" />
      <path d="M19 20a4 4 0 0 1-4 4h-2" />
    </svg>
  );
}

const FeatureList = [
  {
    title: 'Always up-to-date',
    Icon: RefreshIcon,
    description: (
      <>
        Articles here are synced from our internal knowledge base, so this
        content stays current.
      </>
    ),
  },
  {
    title: 'Self-service first',
    Icon: SearchIcon,
    description: (
      <>
        Search or browse by category to find policies, product docs and
        guides without waiting on a support ticket.
      </>
    ),
  },
  {
    title: 'Still need help?',
    Icon: SupportIcon,
    description: (
      <>
        If you can&apos;t find what you&apos;re looking for, reach out to our
        support team directly.
      </>
    ),
  },
];

function Feature({Icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.iconBadge}>
        <Icon className={styles.featureIcon} aria-hidden="true" />
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
