import React, { useState, useEffect } from 'react';
import myContract from './MyContract';

function OrganizerDetails() {
  const [organizer, setOrganizer] = useState('');

  useEffect(() => {
    const getOrganizer = async () => {
      const organizerAddress = await myContract.methods.organizer().call();
      setOrganizer(organizerAddress);
    };

    getOrganizer();
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h3>Organizer Address:</h3>
      <p style={{ marginLeft: '10px', textDecoration: 'underline' }}>{organizer}</p>
    </div>
  );
}

export default OrganizerDetails;
