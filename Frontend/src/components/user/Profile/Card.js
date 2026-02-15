// src/components/user/Profile/Card.js
function Card() {
  const onHandleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-md w-full bg-gray-900 rounded-xl shadow-lg p-8 m-6 mx-auto">
      <h3 className="text-2xl font-bold text-orange-500 mb-6 text-center">
        Profile Update
      </h3>

      <form onSubmit={onHandleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label htmlFor="current-password" className="text-white font-medium mb-1">
            Current Password
          </label>
          <input
            id="current-password"
            type="password"
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter current password"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="new-password" className="text-white font-medium mb-1">
            New Password
          </label>
          <input
            id="new-password"
            type="password"
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter new password"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirm-password" className="text-white font-medium mb-1">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Confirm new password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default Card;
