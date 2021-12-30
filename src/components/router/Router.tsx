import * as React from 'react';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

interface Query extends ParsedUrlQuery {
  id: string;
}

export const BeautifulRouter: React.FC = () => {
  const router: NextRouter = useRouter();
  const { id } = router.query as Query;

  return (
    <div>
      <h1>Todo ID: {id}</h1>

      <Link href={`/contacts/?id=${id}&from=${router.pathname}`}>
        Contacts Page
      </Link>

      <button
        onClick={async () => {
          // lot's of actions here...
          // then navigate!
          await router.push(
            `/contacts?id=${id}&from=${router.pathname}&something=${router.basePath}`
          );
        }}
      >
        Some Action
      </button>
    </div>
  );
};
