 const Header = () => {
    return (
      <div className="bg-white p-4 shadow-md flex justify-between items-center">
        <div className="text-xl font-semibold">Welcome to Admin Panel</div>
        <div className="flex items-center space-x-4">
          <div>Admin</div>
          <img className="w-8 h-8 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="user" />
        </div>
      </div>
    );
  }
  
  export default Header;
   