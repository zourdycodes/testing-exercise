import React, { useState } from 'react';
import { Button, SwipeableDrawer } from '@material-ui/core';

export const Drawer: React.FC = () => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div>
      <h2>Hello Drawer Component!</h2>
      <Button variant="contained" onClick={() => setOpened(true)}>
        open drawer
      </Button>

      <SwipeableDrawer
        anchor="right"
        open={opened}
        onClose={() => setOpened(false)}
        onOpen={() => setOpened(true)}
      >
        hello youtube!
      </SwipeableDrawer>
    </div>
  );
};
