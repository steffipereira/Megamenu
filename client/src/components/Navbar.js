import React from 'react'
import { useGlobalContext } from './Context'

const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu, data } = useGlobalContext()

  const displaySubmenu = (e) => {
    const page = e.target.textContent
    const tempBtn = e.target.getBoundingClientRect()
    const center = (tempBtn.left + tempBtn.right) / 2
    const bottom = tempBtn.bottom - 3
    openSubmenu(page, { center, bottom })
  }

  const handleSubmenu = (e) => {
    if (!e.target.classList.contains('link-btn')) {
      closeSubmenu()
    }
  }

  return (
    <nav className='nav' onMouseOver={handleSubmenu}>
      <div className='nav-center'>
        <div className='nav-header'>
          <button className='btn toggle-btn' onClick={openSidebar}>
            navbar
          </button>
        </div>
        <ul className='nav-links'>
          {data.map((name, index) => (
            <div key={index+1}>
              <li>
                <button className='link-btn' onMouseOver={displaySubmenu}>
                  {name.page}
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
