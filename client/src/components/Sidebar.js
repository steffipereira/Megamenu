import React from 'react'
import { useGlobalContext } from './Context'

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, data } = useGlobalContext()

  return (
    <div
      className={`${
        isSidebarOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper'
      }`}
    >
      <aside className='sidebar'>
        <button className='close-btn' onClick={closeSidebar}>
          x
        </button>
        <div className='sidebar-links'>
          <article>
            {data.map((items, index) => (
              <div key={index+1}>
                <h4>{items.page}</h4>
                <div className='sidebar-sublinks'>
                  {items.links.slice(0,5).map(({ url, label, custom_name }) => (
                    <a key={label} href={url}>{custom_name ? custom_name : label}</a>)
                  )}
                </div>
              </div>
            ))}
          </article>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
