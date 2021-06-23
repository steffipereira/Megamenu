import React from 'react'
import { useGlobalContext } from './Context'

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, page: { page, links } } = useGlobalContext()
  return (
    <div
      className={`${
        isSidebarOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper'
      }`}
    >
      <aside className='sidebar'>
        <button className='close-btn' onClick={closeSidebar}>
          close icon
        </button>
        <div className='sidebar-links'>
          <article>
            <h4>{page}</h4>
            <div className='sidebar-sublinks'>
              {links.map((link, index) => {
                const { url, icon, label } = link
                return (
                  <a key={index} href={url}>
                    {icon}
                    {label}
                  </a>
                )
              })}
            </div>
          </article>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
