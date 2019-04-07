import * as React from 'react';

interface CapabilityProps {
  image: string;
  title: string;
}

const Capability: React.SFC<CapabilityProps> = ({ image, title, children }) => (
  <div className="col-md-4 text-center">
    <img src={image} alt={title} className="mx-auto" />
    <h4>{title}</h4>
    <p>{children}</p>
  </div>
);

export const Capabilities: React.SFC = () => (
  <div className="container my-5 py-2">
    <h2 className="text-center font-weight-bold my-5">Break the Frontend Monolith!</h2>
    <div className="row">
      <Capability image={require('../../assets/capability-cloud.png')} title="Cloud Ready">
        Perfect for distributed systems running in the cloud.
      </Capability>
      <Capability image={require('../../assets/capability-license.png')} title="MIT Licensed">
        No proprietary software hijacking the security of your app.
      </Capability>
      <Capability image={require('../../assets/capability-tooling.png')} title="Tooling First">
        Every feature plays well with custom and standard tooling.
      </Capability>
    </div>
    <div className="row">
      <Capability image={require('../../assets/capability-convenient.png')} title="High Convenience">
        The base layer gives you high convenience without sacrifices.
      </Capability>
      <Capability image={require('../../assets/capability-performance.png')} title="Great Performance">
        Performance is important and valued as a feature.
      </Capability>
      <Capability image={require('../../assets/capability-smart.png')} title="Data-Driven">
        Build fully dynamic and scalable applications in no time.
      </Capability>
    </div>
  </div>
);
