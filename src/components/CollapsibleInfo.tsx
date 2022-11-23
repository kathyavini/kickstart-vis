import { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { Info } from './Info';

export const CollapsibleInfo = () => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="collapse-section">
      <div className="collapse-row">
        <h2>Guide/Information</h2>
        <Collapsible.Trigger asChild>
          <button className="collapse-toggle">
            {' '}
            <span className="material-icons">
              {open ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </Collapsible.Trigger>
      </div>
      <Collapsible.CollapsibleContent>
        <Info />
      </Collapsible.CollapsibleContent>
    </Collapsible.Root>
  );
};
