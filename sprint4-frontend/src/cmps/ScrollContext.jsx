import { createContext, useContext, useState } from "react"

const ScrollContext = createContext()

export function useScroll() {
    return useContext(ScrollContext)
}

export const ScrollProvider = ({ children }) => {
    const [isHeaderVisible, setHeaderVisible] = useState(true)

    return (
        <ScrollContext.Provider value={{ isHeaderVisible, setHeaderVisible }}>
            {children}
        </ScrollContext.Provider>
    )
}