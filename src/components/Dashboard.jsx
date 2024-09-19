// src/components/Dashboard.jsx
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/packages', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPackages(data);
      } else {
        console.error('Error fetching packages:', await response.json());
      }
    };

    fetchPackages();
  }, []);

  return (
    <div>
      <h2>Packages</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Tracking Number</th>
            <th>Recipient</th>
            <th>Apartment</th>
            <th>Arrival Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td>{pkg.tracking_number}</td>
              <td>{pkg.recipient_name}</td>
              <td>{pkg.apartment_number}</td>
              <td>{new Date(pkg.arrival_date).toLocaleString()}</td>
              <td>{pkg.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
