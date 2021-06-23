import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState({ page: '', links: [] })
  const [location, setLocation] = useState({})

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const openSubmenu = (text, coordinates) => {
    const page = data.find((link) => link.page === text)
    setPage(page)
    setLocation(coordinates)
    setIsSubmenuOpen(true)
  }

  const closeSubmenu = () => {
    setIsSubmenuOpen(false)
  }

  const fetchData = async() => {
    const fetchData = await fetch('/users')
    const response = await fetchData.json()
    if (response) {
      const data = response[0].navCatagories
      const pages = data.map(item => {
      const page = item.name
      const links = item.children_data.map(child => ({
        label: child.name,
        url: child.category_path,
        include_in_menu: child.include_in_menu,
        include_in_menu_column2: child.include_in_menu_column2,
        include_in_menu_column3: child.include_in_menu_column3,
      }))
      return { page, links }
      })
      console.log(pages)
      setData(pages)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        page,
        data,
        location,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
