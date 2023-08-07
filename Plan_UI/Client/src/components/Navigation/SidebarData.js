//REACT ICONS FROM https://react-icons.github.io/react-icons
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as CgIcons from "react-icons/cg";
import * as GrIcons from "react-icons/gr";

export const NavbarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiOutlineHome/>,
        className: "nav-text"
    },
    {
        title: "Database",
        path: "/database",
        icon: <AiIcons.AiOutlineDatabase/>,
        className: "nav-text"
    },
    {
        title: "Layout",
        path: "/layout",
        icon: <AiIcons.AiOutlineLayout/>,
        className: "nav-text"
    },
    {
        title: "Margo Cart",
        path: "/margocart",
        icon: <AiIcons.AiOutlineShoppingCart/>,
        className: "nav-text"
    },
    {
        title: "Analytics",
        path: "/analytics",
        icon: <AiIcons.AiOutlineLineChart/>,
        className: "nav-text"
    },
    {
        title: "Tasks",
        path: "/tasks",
        icon: <FaIcons.FaTasks/>,
        className: "nav-text"
    },
    {
        title: "Profile",
        path: "/profile",
        icon: <CgIcons.CgProfile/>,
        className: "nav-text"
    },
    {
        title: "Settings",
        path: "/settings",
        icon: <IoIcons.IoMdSettings/>,
        className: "nav-text"
    },
    {
        title: "Contact Us",
        path: "/contactUs",
        icon: <GrIcons.GrContact/>,
        className: "nav-text"
    },
    {
        title: "Sign Out",
        path: "/",
        icon: <FaIcons.FaSignOutAlt/>,
        className: "nav-text"
    },
]
