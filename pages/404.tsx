import { NextPage } from 'next';
import TypeIt from 'typeit-react';

const Error404Page: NextPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="px-8 text-center">
        <h2 className="mb-8 block text-4xl">
          <span className="block text-9xl">404</span>
          Page not found
        </h2>
        <p className="text-2xl">
          <TypeIt
            options={{ waitUntilVisible: true }}
            getBeforeInit={instance =>
              // text -> We can't seem to find the page you're looking for
              instance
                .type("we can't")
                .move(-7)
                .delete(1)
                .type('W')
                .move(null, { to: 'END' })
                .type(' seem to find the page youre')
                .pause(50)
                .move(-2)
                .type("'")
                .move(null, { to: 'END' })
                .type(' looking for.')
            }
          />
        </p>
      </div>
    </div>
  );
};

export default Error404Page;
