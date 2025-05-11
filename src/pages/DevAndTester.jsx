import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import AngelinaImg from '../assets/Angelina.png';
import SivaImg from '../assets/Siva1.png';
import AmrithaImg from '../assets/amritha.png';
import RamImg from '../assets/viswa.png';

export default function DevAndTester() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      try {
        const sampleUsers = [
          {
            _id: '1',
            name: 'Angelina',
            email: 'angelina_de_sou@example.com',
            role: 'Developer',
            profile: AngelinaImg,
          },
          {
            _id: '2',
            name: 'Sivaraman',
            email: 'Siva934@example.com',
            role: 'Developer',
            profile: SivaImg,
          },
          {
            _id: '3',
            name: 'Amritha',
            email: 'Amritha_cli@example.com',
            role: 'Project Manager',
            profile: AmrithaImg,
          },
          {
            _id: '4',
            name: 'Ram',
            email: 'Ram_kumar@example.com',
            role: 'Tester',
            profile: RamImg,
          },
        ];

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          storedUser._id = 'local-' + Date.now();
          sampleUsers.push(storedUser);
        }

        setUsers(sampleUsers);
      } catch (err) {
        console.error('Error fetching Users:', err);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <>
      <NavBar />
      <div className="min-h-screen mt-1 flex bg-gray-100">
        <SideNav />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="sm:hidden space-y-4">
            {users.length > 0 ? (
              users.map(user => (
                <div key={user._id} className="bg-white p-4 rounded shadow">
                  {user.profile && (
                    <img
                      src={user.profile}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover mb-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-user.png";
                      }}
                    />
                  )}
                  <div className="mb-1 font-semibold text-lg">{user.name}</div>
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Role:</strong> {user.role}</div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Users not found</p>
            )}
          </div>

          <div className="hidden sm:block">
            <table className="min-w-full bg-white rounded shadow overflow-hidden">
              <thead>
                <tr className="text-white bg-gray-700">
                  <th className="text-left py-3 px-4">Profile</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map(user => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      {user.profile && (
                        <td className="py-3 px-4">
                          <img
                            src={user.profile}
                            alt={user.name}
                            className="w-16 h-16 rounded-full object-cover mb-2"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/default-user.png";
                            }}
                          />
                        </td>
                      )}
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4 capitalize">{user.role}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      Users not found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
