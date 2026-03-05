import {useLocation} from "react-router-dom"
import Header from "../components/custom/Header"

const AppLayout=({children})=>{
    const location = useLocation()

    const showHeaderRoutes=["/feed","create","/profile"]

    const shouldShowHeader=showHeaderRoutes.includes(location.pathname)

    return(
        <div className="min-h-screen flex flex-col">
            {shouldShowHeader && <Header />}
            <main className="flex-1">{children}</main>
        </div>
    )
}

export default AppLayout;