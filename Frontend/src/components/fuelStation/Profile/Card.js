
function Card({ onSubmit }) {
  return (
    <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-lg mx-auto mt-8">
      <h3 className="text-orange-400 text-2xl font-semibold mb-6 text-center">Profile Update</h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="current-password" className="text-white mb-1">
            Current Password
          </label>
          <input
            id="current-password"
            name="currentPassword"
            type="password"
            required
            className="p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="new-password" className="text-white mb-1">
            New Password
          </label>
          <input
            id="new-password"
            name="newPassword"
            type="password"
            required
            className="p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirm-password" className="text-white mb-1">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
            className="p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default Card;
