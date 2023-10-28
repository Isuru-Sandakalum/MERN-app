import { useEffect, useRef, useState } from "react";
import { PiSignOutBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { Link } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice.js";

import { useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  //upload photos to the fireBase storage
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [showListingError, setShowLisitngError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  //save data to api handleChange function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //sent to data to database handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  //Delete user Function
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  //signOut function
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  //show listing
  const handleShowListing = async () => {
    try {
      setShowLisitngError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowLisitngError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowLisitngError(true);
    }
  };

  //Listing delete function
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mx-auto p-3">
      <h1 className="my-7 text-3xl font-semibold text-center">User Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mx-auto p-3 w-[400px] sm:w-[800px]"
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer mt-2 self-center"
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        ></img>
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image Upload (Image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-white">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-500">Successfully Uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          id="username"
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          className=" p-3 rounded-md  bg-black"
          onChange={handleChange}
        ></input>
        <input
          id="email"
          type="email"
          placeholder="email@.com"
          defaultValue={currentUser.email}
          className=" p-3 rounded-md  bg-black"
          onChange={handleChange}
        ></input>
        <input
          id="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
          className=" p-3 rounded-md  bg-black"
        ></input>

        <div className=" flex justify-center items-center mx-auto gap-3">
          <span
            className=" text-white  shadow-md py-2 shadow-gray-600 rounded-full px-2  cursor-pointer text-[18px] sm:text-[23px] m-2"
            onClick={handleSignOut}
          >
            <PiSignOutBold />
          </span>

          <button
            disabled={loading}
            className=" bg-transparent border border-primary rounded-md py-2 px-8 items-center text-primary font-semibold mx-auto disabled:opacity-50"
          >
            {loading ? "Loading..." : "Update"}
          </button>

          <Link
            className=" bg-transparent border border-[#A6FF96] text-[#A6FF96] font-semibold px-2 py-2  rounded-md"
            to={"/create-listing"}
          >
            Create Listing
          </Link>

          <span
            className=" text-white  shadow-md py-2 shadow-gray-600 rounded-full px-2 cursor-pointer text-[18px] sm:text-[23px]"
            onClick={handleDeleteUser}
          >
            <AiOutlineDelete />
          </span>
        </div>
      </form>
      <div
        onClick={handleShowListing}
        className=" items-center flex-col mx-auto justify-between text-center w-[400px] sm:w-[600px] overflow-auto h-[170px]"
      >
        <button className="text-[#A6FF96]">Show My Listing</button>
        <p className=" text-center text-red-600">
          {showListingError ? "Error showing lisiting !" : " "}
        </p>
        {userListings &&
          userListings.length > 0 &&
          userListings.map((listing) => (
            <div
              key={listing._id}
              className=" rounded-lg p-3  items-center justify-center gap-4 shadow-md shadow-black grid grid-cols-3  "
            >
              <Link
                to={`/listing/${listing._id}`}
                className="h-[100px] w-[120px] flex object-contain items-center p-2 "
              >
                <img src={listing.imageUrls[0]} alt="listing cover"></img>
              </Link>

              <Link
                to={`/listing/${listing._id}`}
                className=" text-slate-300 font-semibold items-center truncate "
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button
                   onClick={() => handleListingDelete(listing._id)}
                  className="text-green-500"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                <button>Edit</button>
                </Link>
                
              </div>
              <span></span>
            </div>
          ))}
      </div>
    </div>
  );
}
