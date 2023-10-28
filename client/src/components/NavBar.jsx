import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar() {
  const {currentUser} = useSelector(state => state.user);
  const [searchTerm,setSearchTerm] = useState('');
  const navigate = useNavigate();

  //search funtion
  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(()=>{
    const urlParams =  new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get('searchTerm');
    if(searchTermFormUrl){
      setSearchTerm(searchTermFormUrl);
    }
  },[location.search]);

  return (
    <div>
      <header className=" flex-wrap shadow-sm shadow-gray-600">
        <div className=" flex justify-between items-center max-w-[1240px] mx-auto p-3">
          {/* logo of the company */}
          <Link to={'/'}>

          <h1 className=" text-sm sm:text-xl lg:text-2xl">
            <span className="text-primary font-bold">Build</span>
            <span className="font-bold">You</span>
          </h1>

          </Link>
        

          {/* search component */}
          <form onSubmit={handleSubmit} className="flex items-center justify-center ">
            <input
              type="text"
              placeholder="search here"
              className=" focus:outline-none w-24 sm:w-64 m-2 p-2 bg-transparent border-b hover:border-primary"
              value={searchTerm}
              onChange={(e) =>setSearchTerm(e.target.value)}
            ></input>
            <button><AiOutlineSearch/></button>
          </form>

          {/* tabs */}
          <ul className="flex items-center justify-center gap-4">
            <Link to={'/'} className=" hidden sm:inline text-slate-200 hover:border-b hover:border-gray-400 font-semibold text-sm sm:text-lg py-2 px-5 hover:text-primary">
              Home
            </Link>

            <Link to={'/about'} className=" hidden sm:inline text-slate-200 hover:border-b hover:border-gray-400 font-semibold text-sm sm:text-lg py-2 px-5 hover:text-primary">
              About
            </Link>

            <Link to={'/contact'} className=" hidden sm:inline text-slate-200 hover:border-b hover:border-gray-400 font-semibold text-sm sm:text-lg py-2 px-5 hover:text-primary">
              Contact
            </Link>
            <Link  to={'/profile'} >
              {currentUser ? (
                <img className=" rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile"></img>
              ):(
                <li className=" bg-transparent text-slate-200 py-2 px-5 hover:border-b hover:border-gray-400 font-semibold text-sm sm:text-lg hover:text-primary">Sign in</li>
              )}
           
            </Link>
          </ul>
        </div>
      </header>
    </div>
  );
}
