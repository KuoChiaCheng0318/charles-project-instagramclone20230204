import React from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption';
import HomeIcon from "@material-ui/icons/Home"
import SearchIcon from "@material-ui/icons/Search"
import ExploreIcon from "@material-ui/icons/ExploreOutlined"
import MessageIcon from "@material-ui/icons/SendOutlined"
import FavoriteBorderOutlined from "@material-ui/icons/FavoriteBorderOutlined"
import AddBoxOutlined from "@material-ui/icons/AddBoxOutlined"
import { Avatar } from '@material-ui/core'





function Sidebar({username}) {
  return (
    <div className='sidebar'>
        <SidebarOption active Icon={HomeIcon} text="Home" />
        <SidebarOption Icon={SearchIcon} text="Search"/>
        <SidebarOption Icon={ExploreIcon} text="Explore"/>
        <SidebarOption Icon={MessageIcon} text="Messages"/>
        <SidebarOption Icon={FavoriteBorderOutlined} text="Notifications"/>
        <SidebarOption Icon={AddBoxOutlined} text="Create"/>

        <div className='sidebar__user'>
          <Avatar className='sidebar__avatar'
          alt={username}
          src="/static/images/avatar/1.jpg"
          />
          {username? (<h3>{username}</h3>):(<h3>Profile</h3>)}
        </div>
        

    </div>
    

  )
}

export default Sidebar;