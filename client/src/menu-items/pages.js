// assets
import {
  LoginOutlined,
  ProfileOutlined,
  UsergroupDeleteOutlined,
  AppstoreOutlined,
  BranchesOutlined,
  FileAddOutlined
} from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  UsergroupDeleteOutlined,
  FileAddOutlined,
  AppstoreOutlined,
  BranchesOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/app/home',
      icon: icons.AppstoreOutlined
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/app/users',
      icon: icons.UsergroupDeleteOutlined
    }
  ]
};

export default pages;
