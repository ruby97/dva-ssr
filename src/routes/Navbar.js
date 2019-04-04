import React from 'react'
import { NavLink, Link } from 'dva/router'

export default function Navbar() {
  const languages = [{
    name: 'All',
    param: 'all'
  }, {
    name: 'JavaScript',
    param: 'javascript',
  }, {
    name: 'Ruby',
    param: 'ruby',
  }, {
    name: 'Python',
    param: 'python',
  }, {
    name: 'Java',
    param: 'java',
  }];

  return (
    <ul>
      {languages.map(({name, param}) => (
        <li key={param}>
          <NavLink activeStyle={{fontWeight: 'bold'}} to={`/popular/${param}`}>
            {name}
          </NavLink>
        </li>
      ))}
      <li><Link to='/topic'>Topic</Link></li>
      <li><Link to='/setting'>Setting</Link></li>
      <li><Link to='/login'>Log In</Link></li>
      <li><Link to='/admin'>Admin(Need Login)</Link></li>
    </ul>
  )
}
