import PollSharp from '@mui/icons-material/PollSharp';
import SensorWindowRounded from '@mui/icons-material/SensorWindowRounded';
import AnalyticsIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentIndIcon from '@mui/icons-material/AssignmentIndRounded';
import DescriptionIcon from '@mui/icons-material/DescriptionRounded';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportationRounded';
import FeedIcon from '@mui/icons-material/FeedRounded';
import GridViewIcon from '@mui/icons-material/GridViewRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import SpeedIcon from '@mui/icons-material/SpeedRounded';
import StorageIcon from '@mui/icons-material/StorageRounded';
import StoreIcon from '@mui/icons-material/StoreRounded';
import FolderCopyRounded from '@mui/icons-material/FolderCopyRounded';
import { NavigationSystem } from '@/Core/RouterProvider';
import TranslateIcon from "@mui/icons-material/TranslateOutlined"
import ChatIcon from "@mui/icons-material/ChatOutlined"
export type RouteItem = {
  path: string;
  title: string;
  icon?: JSX.Element;
  children?: RouteItem[];
};
export const useRouteLinks = (): NavigationSystem[] => [

  {
    subheader: 'Apps&Tools',
    items: [
      {
        path: '/localization',
        title: 'Localization Services',
        icon: <TranslateIcon />,
      },
      {
        path: '/chat',
        title: 'Chat',
        icon: <ChatIcon />,
      },
    ]
  },
];
