import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from './Context'

const Submenu = () => {
  const {
    isSubmenuOpen,
    location,
    page: { page, links },
  } = useGlobalContext()

  const container = useRef(null)
  const [columns, setColumns] = useState('col-2')

  const column1 = links.filter(item => !item.include_in_menu_column2 && !item.include_in_menu_column3)
  const column2 = links.filter(item => item.include_in_menu_column2 && !item.include_in_menu_column3)

  useEffect(() => {
    setColumns('col-2')
    const submenu = container.current
    const { center, bottom } = location
    submenu.style.left = `${center}px`
    submenu.style.top = `${bottom}px`
    console.log(links)
    // if (links.length === 3) {
    //   setColumns('col-3')
    // }
    // if (links.length > 3) {
    //   setColumns('col-4')
    // }
  }, [page, location, links])

  return (
    <aside
      className={`${isSubmenuOpen ? 'submenu show' : 'submenu'}`}
      ref={container}
    >
      <section>
        <h4>{page}</h4>
        <div className={`submenu-center ${columns}`}>
          <div className="col-1">
            {column1.map(link => <Links {...link} />)}
          </div>
          <div className="col-1">
             {column2.map(link => <Links {...link} />)}
          </div>
        </div>
      </section>
    </aside>
  )
}

export const Links = ({ url, label, custom_category_name }) => {
  return <a href={url}>{custom_category_name ? custom_category_name : label}</a>
}

export default Submenu
