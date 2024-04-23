import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const linkStyle = {
    textDecoration: 'none',
    color: '#000', // Change color as needed
  };

  const listItemStyle = {
    margin: '0 4px', // Adjust margin as needed
    listStyleType: 'none',
    display: 'inline-block',
  };

  const profileImageStyle = {
    height: '28px', // Adjust height as needed
    width: '28px', // Adjust width as needed
    borderRadius: '50%', // Make the image round
    objectFit: 'cover',
  };

  return (
    <div style={{ backgroundColor: '#ccc' /* Change background color as needed */ }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to='/' style={linkStyle}>
          <h1 style={{ fontWeight: 'bold', margin: '0' }}>Cloud Lab</h1>
        </Link>
        <ul style={{ margin: '0', padding: '0', listStyleType: 'none', display: 'flex', gap: '4px' }}>
          <Link to='/' style={linkStyle}>
            <li style={listItemStyle}>Home</li>
          </Link>
          {/* <Link to='/calculator' style={linkStyle}>
            <li style={listItemStyle}>Calculator</li>
          </Link> */}
          <Link to='/profile' style={linkStyle}>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' style={profileImageStyle} />
            ) : (
              <li style={listItemStyle}>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
