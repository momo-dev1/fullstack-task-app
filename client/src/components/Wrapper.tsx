import React from 'react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mx-auto max-w-screen-xl pt-40 w-full px-2">
      {children}
    </section>
  );
};

export default Wrapper;
