import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 px-14 z-50 flex justify-start items-center gap-1.5 bg-transparent">
      <Link to="/" className="flex items-center gap-1.5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.03 10.77L20.69 6.98001C21.26 6.60001 21.41 5.82001 21.03 5.26001L19.21 2.54999C18.83 1.97999 18.05 1.82999 17.49 2.20999L11.83 6L15.03 10.77Z" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.1738 6.47923L7.39616 9.67911L9.95607 13.5013L14.7337 10.3014L12.1738 6.47923Z" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.83 15.9L9.78 13.26L7.54 9.92001L3.59 12.56C3.13 12.87 3.01 13.49 3.32 13.95L4.45 15.63C4.75 16.08 5.37 16.2 5.83 15.9Z" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.05 12.2L7.56 22" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 12.2L16.44 22" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h1 className="text-[#AAAAAA] text-2xl">TEAM 42</h1>
      </Link>
        {/* Add more navigation links here if needed */}
    </header>
  )
}
