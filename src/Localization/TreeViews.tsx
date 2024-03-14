import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { TreeView } from '@mui/x-tree-view/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  TreeItem,
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
} from '@mui/x-tree-view/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useLocalizationStore } from './state';

const CustomContentRoot = styled('div')(({ theme }) => ({
  WebkitTapHighlightColor: 'transparent',
  '&&:hover, &&.Mui-disabled, &&.Mui-focused, &&.Mui-selected, &&.Mui-selected.Mui-focused, &&.Mui-selected:hover':
    {
      backgroundColor: 'transparent',
    },
  '.MuiTreeItem-contentBar': {
    position: 'absolute',
    width: '100%',
    height: 24,
    left: 0,
  },
  '&:hover .MuiTreeItem-contentBar': {
    backgroundColor: theme.palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
  '&.Mui-disabled .MuiTreeItem-contentBar': {
    opacity: theme.palette.action.disabledOpacity,
    backgroundColor: 'transparent',
  },
  '&.Mui-focused .MuiTreeItem-contentBar': {
    backgroundColor: theme.palette.action.focus,
  },
  '&.Mui-selected .MuiTreeItem-contentBar': {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity,
    ),
  },
  '&.Mui-selected:hover .MuiTreeItem-contentBar': {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
    ),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity,
      ),
    },
  },
  '&.Mui-selected.Mui-focused .MuiTreeItem-contentBar': {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
    ),
  },
}));

const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps,
  ref,
) {
  const {
    className,
    classes,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event);
    handleSelection(event);
  };

  return (
    <CustomContentRoot
      className={clsx(className, classes.root, {
        'Mui-expanded': expanded,
        'Mui-selected': selected,
        'Mui-focused': focused,
        'Mui-disabled': disabled,
      })}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <div className="MuiTreeItem-contentBar" />
      <div className={classes.iconContainer}>{icon}</div>
      <Typography component="div" className={classes.label}>
        {label}
      </Typography>
    </CustomContentRoot>
  );
});

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: TreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
});

const TreeItemNested = ({parentId,data}:{
  parentId?:string,
  data:Record<string,string[]>
})=>{
  return (
    <>
    {Object.keys(data).map((key) => {
      return (
        <CustomTreeItem key={key} onSelect={e=>e.stopPropagation()} nodeId={[parentId,key].filter(Boolean).join(".")} label={key} >
          {data[key].map((value,i) => {
            if(Array.isArray(value)){
              return <React.Fragment key={i}>
                {value.map((v,j) => (
                  <CustomTreeItem key={j} nodeId={
                    [parentId,key].filter(Boolean).join(".")+"."+v
                  } label={v} />
                ))}
              </React.Fragment>
            }
            if(typeof value === "object"){
              return <TreeItemNested key={i} data={value} parentId={[parentId,key].filter(Boolean).join(".")} />
            }
            return <CustomTreeItem key={i} nodeId={[parentId,key,value].filter(Boolean).join(".")} label={value} />;
          })}
        </CustomTreeItem>
      );
    })}
    </>
  )
}

export default function LocalizationTreeSidebar() {
  const {listOfAllKeys,workingOnPath,setWorkingOnPath} = useLocalizationStore();
  return (
    <Box sx={{display:"block", height:"100vh",overflowY:"overlay", minWidth: 300,bgcolor:"background.paper" }}>
      <TreeView
        aria-label="icon expansion"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        selected={workingOnPath}
        sx={{ position: 'relative' }}
        onNodeSelect={(e,values)=>{
          // @ts-ignore
          setWorkingOnPath(values.split("."));
        }}
      >
        {listOfAllKeys.map((value,i) => {
          return <TreeItemNested data={value} key={i} />
        })}
      </TreeView>
    </Box>
  );
}