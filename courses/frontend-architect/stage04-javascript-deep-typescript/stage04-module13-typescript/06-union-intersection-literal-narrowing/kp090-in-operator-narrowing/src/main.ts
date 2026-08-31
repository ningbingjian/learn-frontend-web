type EmailContact = {
  email: string;
  verified: boolean;
};

type PhoneContact = {
  phone: string;
  countryCode: string;
};

function formatContact(contact: EmailContact | PhoneContact): string {
  if ('email' in contact) {
    const status = contact.verified ? 'verified' : 'unverified';
    return `email:${contact.email}:${status}`;
  }

  return `phone:${contact.countryCode}-${contact.phone}`;
}

console.log(
  formatContact({ email: 'ada@example.com', verified: true })
);
console.log(
  formatContact({ phone: '13800138000', countryCode: '+86' })
);
