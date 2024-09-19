import db from '../db.js';

// Obtener todos los paquetes
export const getAllPackages = async (req, res) => {
  try {
    const packages = await db.query('SELECT * FROM packages');
    return res.status(200).json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Crear un nuevo paquete
export const createPackage = async (req, res) => {
  const { tracking_number, recipient_name, apartment_number, arrival_date } = req.body;

  try {
    await db.query('INSERT INTO packages (tracking_number, recipient_name, apartment_number, arrival_date) VALUES (?, ?, ?, ?)', 
    [tracking_number, recipient_name, apartment_number, arrival_date]);
    return res.status(201).json({ message: 'Package created successfully' });
  } catch (error) {
    console.error('Error creating package:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
