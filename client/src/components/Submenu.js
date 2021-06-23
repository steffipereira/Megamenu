import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from './Context'

const Submenu = () => {
  const {
    isSubmenuOpen,
    location,
    page: { page, links },
  } = useGlobalContext()

  const container = useRef(null)
  const header = links.find(name => name.custom_name === `View all ${page}`)
  const column1 = links.filter(item => !item.column2 && !item.column3 && item !== header && item.column2 !== undefined && item.column3 !== undefined)
  const column2 = links.filter(item => item.column2 && !item.column3 && item.column2 !== undefined && item.column3 !== undefined)

  useEffect(() => {
    const submenu = container.current
    const { center, bottom } = location
    submenu.style.left = `${center}px`
    submenu.style.top = `${bottom}px`
  }, [page, location, links])

  return (
    <aside
      className={`${isSubmenuOpen ? 'submenu show' : 'submenu'}`}
      ref={container}
    >
      <section>
        <div className="submenu-center col-2">
          <div className="col-1">
            {header && <a href={header.url}>{header.custom_name}</a>}
            {column1.map((link, index) => <Links key={index+1} {...link} />)}
          </div>
          <div className="col-1">
             {column2.map((link, index) => <Links key={index+1} {...link} />)}
          </div>
        </div>
      </section>
    </aside>
  )
}

export const Links = ({ url, label, custom_name }) => {
  return <a href={url}>{custom_name ? custom_name : label}</a>
}

export default Submenu
