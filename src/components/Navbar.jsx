import React from "react";
import Logo from "../assets/tetelestailogo1.png";

function Navbar({title, links=[]}) {
    return (
        <nav className="fixed top-0 left-0 w-full bg-[#fafad2] shadow-md z-50 px-6 py-2 flex justify-between items-center">
            <div className="flex justify-cetner items-center">
                <img src={Logo} className="h-20 w-auto"></img>
                <a href="/" >{title}</a>
            </div>
            
            <ul className="flex gap-4">
                {links.map((link, index) => (
                    <li key={index}>
                        <a href={link.href} className="px-2 py-2 rounded hover:bg-gray-200 transition-colors duration-700">{link.label}</a>
                    </li>
                ))}
            </ul>
        </nav>

    )
}

export default Navbar;