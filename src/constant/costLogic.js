const logic = {
  reject: {
    priority: 1,
    rule: 'Reject',
    condition: 'If the weight exceeds 50kg',
    weightLimit: 50,
    volumeLimit: 0,
    formula: 'N/A',
    basePrice: 'N/A',
  },
  heavyParcel: {
    priority: 2,
    rule: 'Heavy Parcel',
    condition: 'If the weight exceeds 10kg',
    weightLimit: 10,
    volumeLimit: 0,
    formula: '$15 x Weight (kg)',
    basePrice: 15,
  },
  smallParcel: {
    priority: 3,
    rule: 'Small Parcel',
    condition: 'If the volume is less than 1500',
    weightLimit: 0,
    volumeLimit: 1500,
    formula: '$0.05 x Volume',
    basePrice: 0.05,
  },
  mediumParcel: {
    priority: 4,
    rule: 'Medium Parcel',
    condition: 'If the volume is less than 2500',
    weightLimit: 0,
    volumeLimit: 2500,
    formula: '$0.04 x Volume',
    basePrice: 0.04,
  },
  largeParcel: {
    priority: 5,
    rule: 'Large Parcel',
    condition: '',
    weightLimit: 0,
    volumeLimit: 0,
    formula: '$0.03 x Volume',
    basePrice: 0.03,
  },
};

export const volume = (height, width, depth) => {
  return height * width * depth;
};

export const getCost = () => {
  
}

export default logic;
