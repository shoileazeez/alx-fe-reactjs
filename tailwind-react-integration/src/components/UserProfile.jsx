function UserProfile() {
  return (
    <div className="bg-gray-100 p-8 sm:p-4 md:p-8 max-w-sm sm:max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg">
      <img src="https://gratisography.com/photo/augmented-reality/" alt="User" className="rounded-full sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto"/>
      <h1 className="text-xl sm:text-lg md:text-xl text-blue-800 my-4">John Doe</h1>
      <p className="text-gray-600 sm:text-sm md:text-base">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;