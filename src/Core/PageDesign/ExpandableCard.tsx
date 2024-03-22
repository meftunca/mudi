import ExpandMore from '@mui/icons-material/ExpandMore';
import { Card, CardContent, CardHeader, Collapse, Divider, IconButton } from '@mui/material';
import React, { memo, useState } from 'react';
import createStore from 'zustand';

type CollapseStateTypes = {
  actvieCollapse: string | null
  setActiveCollapse: (newCollapseId: string) => void
}

const useCollapseState = createStore<CollapseStateTypes>((set) => ({
  actvieCollapse: localStorage.getItem(`${location.pathname}active-board:id`) || 'Buttons',
  setActiveCollapse: (newCollapseId: string | null) => {
    localStorage.setItem(`${location.pathname}active-board:id`, String(newCollapseId))
    set({ actvieCollapse: newCollapseId })
  },
}))

type ExpandableCardProps = {
  title: string
  children: React.ReactNode
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ title, children }) => {
  const [mount, setMount] = useState(false)
  const { actvieCollapse, setActiveCollapse } = useCollapseState()
  return (
    <Card elevation={actvieCollapse === title ? 2 : 0} sx={{ m: 2 }}>
      <CardHeader
        title={title}
        action={
          <IconButton
            onClick={() =>
              setActiveCollapse(
                // @ts-ignore
                actvieCollapse !== null && actvieCollapse === title ? null : title,
              )
            }
          >
            <ExpandMore
              sx={{
                transition: 'all .2s ease',
                transformOrigin: 'center',
                transform: `rotate(${actvieCollapse !== title ? 0 : -180}deg)`,
              }}
            />
          </IconButton>
        }
      />
      <Divider />
      <Collapse
        in={actvieCollapse === title}
        onExited={() => setMount(false)}
        onEntering={() => setMount(true)}
      >
        <CardContent>{mount && children}</CardContent>
      </Collapse>
    </Card>
  )
}

export default memo(ExpandableCard)
